
// Removes common "Smart Quotation" unicode characters in favor of ascii characters
export const cleanseText = (text: string): string => {
  return text
    // emdash
    .replace(/[\u2014]/g, "--")        
    // bullet
    .replace(/[\u2022]/g, "*")         
    // smart single quotes
    .replace(/[\u2018\u2019]/g, "'")   
    // smart double quotes
    .replace(/[\u201C\u201D]/g, '"');
}