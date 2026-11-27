export const discount = deal => Math.round((1 - deal.price / deal.was) * 100);
export const saving = deal => deal.was - deal.price;
export function filterAndSort(deals, state) {
  const q = (state.q || '').trim().toLowerCase();
  let result = deals.filter(d => (!q || `${d.title} ${d.store} ${d.category}`.toLowerCase().includes(q)) && (!state.category || d.category === state.category) && (!state.store || d.store === state.store) && discount(d) >= (Number(state.min) || 0));
  const sort = state.sort || 'discount';
  result.sort((a,b) => sort === 'saving' ? saving(b)-saving(a) : sort === 'price' ? a.price-b.price : sort === 'new' ? (b.verdict==='new-low')-(a.verdict==='new-low') || discount(b)-discount(a) : discount(b)-discount(a));
  return result;
}
