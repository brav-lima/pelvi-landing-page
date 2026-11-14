// Promoção de Black Friday do plano anual. TEMPORÁRIA: para encerrar, troque para false
// (a página volta ao preço de lista e o aviso do topo some).
export const BLACK_FRIDAY = true;

export const ANNUAL_LIST_PRICE = 1428;
export const ANNUAL_PROMO_PRICE = 1068;
// Desconto extra para pagamento à vista (Pix ou cartão em 1x).
export const CASH_DISCOUNT = 0.1;

export const annualPrice = BLACK_FRIDAY ? ANNUAL_PROMO_PRICE : ANNUAL_LIST_PRICE;
export const annualCashPrice = Math.round(annualPrice * (1 - CASH_DISCOUNT) * 100) / 100;
export const annualInstallment = annualPrice / 12;

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
export const formatBRL = (value: number) => brl.format(value).replace(/\u00a0/g, " ");
