// csvLoader.ts
// 브라우저에서 CSV 파일을 읽어 텍스트로 반환하는 유틸리티

export function loadCsvFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target?.result as string);
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}
