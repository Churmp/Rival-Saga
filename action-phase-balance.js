(function initActionPhaseBalance(root, factory) {
  const api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root) root.rivalSagaActionPhaseBalance = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function createActionPhaseBalance() {
  "use strict";

  const CONSOLIDATED_TIERS = Object.freeze(["safari", "poke", "great", "ultra", "master"]);
  const TIER_LABELS = Object.freeze({ safari: "Safari", poke: "Poké", great: "Great", ultra: "Ultra", master: "Master" });
  const TICKET_TIERS = Object.freeze([
    { id: "safari", name: "Safari Ticket", price: 2000, battleTiers: ["Safari"] },
    { id: "poke", name: "Poké Ticket", price: 3000, battleTiers: ["Poké", "Poké Elite"] },
    { id: "great", name: "Great Ticket", price: 5000, battleTiers: ["Great", "Great Elite"] },
    { id: "ultra", name: "Ultra Ticket", price: 7000, battleTiers: ["Ultra", "Ultra Elite"] },
    { id: "master", name: "Master Ticket", price: 9000, battleTiers: ["Master", "Master Elite"] }
  ]);
  const SLOT_MACHINE_RESULTS = Object.freeze([
    { id: "nothing", label: "Better Luck Next Time", weight: 20, rewardTier: "" },
    { id: "safari", label: "Safari Ticket", weight: 30, rewardTier: "safari" },
    { id: "poke", label: "Poké Ticket", weight: 25, rewardTier: "poke" },
    { id: "great", label: "Great Ticket", weight: 15, rewardTier: "great" },
    { id: "ultra", label: "Ultra Ticket", weight: 7, rewardTier: "ultra" },
    { id: "master", label: "Master Ticket", weight: 3, rewardTier: "master" }
  ]);
  const GRAVEYARD_VALUES = Object.freeze({ safari: 1500, poke: 2500, great: 3500, ultra: 5000, master: 7500 });
  const SILPH_COSTS = Object.freeze({ safari: 1000, poke: 2000, great: 3000, ultra: 4000, master: 5000 });
  const DRAGON_DEN_COSTS = Object.freeze({ safari: 1000, poke: 1500, great: 2500, ultra: 4000, master: 6000 });

  function consolidatedTier(value) {
    const normalized = String(value || "")
      .normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
      .toLowerCase().replace(/pok(?:e|\u00e9)/g, "poke").replace(/[^a-z0-9]+/g, "");
    if (/^safari(?:elite)?$/.test(normalized)) return "safari";
    if (/^(?:poke|pokeball)(?:elite)?$/.test(normalized)) return "poke";
    if (/^great(?:ball)?(?:elite)?$/.test(normalized)) return "great";
    if (/^ultra(?:ball)?(?:elite)?$/.test(normalized)) return "ultra";
    if (/^master(?:ball)?(?:elite)?$/.test(normalized)) return "master";
    return "";
  }

  function tierLabel(value) {
    return TIER_LABELS[consolidatedTier(value)] || "";
  }

  function resultForRng(rngValue) {
    const roll = Math.min(0.999999999999, Math.max(0, Number(rngValue) || 0)) * 100;
    let cursor = 0;
    return SLOT_MACHINE_RESULTS.find((result) => {
      cursor += result.weight;
      return roll < cursor;
    }) || SLOT_MACHINE_RESULTS[SLOT_MACHINE_RESULTS.length - 1];
  }

  function normalDepartmentPrice(listedPrice, savingsUsed = 0) {
    const listed = Math.max(0, Number(listedPrice) || 0);
    const remaining = Math.max(0, 3000 - Math.max(0, Number(savingsUsed) || 0));
    const discount = Math.min(Math.round(listed * 0.25), remaining);
    return { listedPrice: listed, discount, finalPrice: listed - discount, remainingAllowance: remaining - discount };
  }

  function clearancePrice(listedPrice) {
    const listed = Math.max(0, Number(listedPrice) || 0);
    const discount = Math.min(Math.round(listed * 0.5), 3000);
    return { listedPrice: listed, discount, finalPrice: listed - discount };
  }

  function salePrice(listedPrice) {
    return Math.round(Math.max(0, Number(listedPrice) || 0) * 0.75);
  }

  function curseRolls(totalDestroyValue) {
    return Math.floor(Math.max(0, Number(totalDestroyValue) || 0) / 6000);
  }

  function summedTierCost(tiers, table) {
    return (tiers || []).reduce((total, tier) => total + Number(table[consolidatedTier(tier)] || 0), 0);
  }

  return Object.freeze({
    CONSOLIDATED_TIERS, TIER_LABELS, TICKET_TIERS, SLOT_MACHINE_RESULTS,
    GRAVEYARD_VALUES, SILPH_COSTS, DRAGON_DEN_COSTS,
    consolidatedTier, tierLabel, resultForRng, normalDepartmentPrice,
    clearancePrice, salePrice, curseRolls,
    silphTotalCost: (tiers) => summedTierCost(tiers, SILPH_COSTS)
  });
});
