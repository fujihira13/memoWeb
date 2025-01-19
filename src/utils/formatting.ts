/**
 * 数値を日本円の表示形式にフォーマットする
 * @param amount フォーマットする金額
 * @returns 「¥1,000」のような形式の文字列
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
  }).format(amount);
};
