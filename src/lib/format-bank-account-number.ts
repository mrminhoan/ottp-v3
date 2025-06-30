export function formatBankAccountNumber(input: string): string {
  if (!input) return ''
  return input
    .replace(/\s/g, '') 
    .replace(/(.{4})/g, '$1 ')
    .trim()
}

