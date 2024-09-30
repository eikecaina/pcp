export function isWorkDay(
  dates: (Date | string)[]
): { date: Date; isWeekend: boolean }[] {
  return dates.map((date) => {
    const validDate = typeof date === "string" ? new Date(date) : date;
    const isWeekend = validDate.getDay() === 0 || validDate.getDay() === 6;
    return { date: validDate, isWeekend };
  });
}

export function checkDatesRange(
  startDate: string,
  endDate: string,
  consumDate: string,  // Adicionando a data de consumo
  datesArray: string[]
): {
  startIndex: number | null;
  endIndex: number | null;
  consumIndex: number | null;  // Adicionando retorno do índice da data de consumo
} {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const consum = new Date(consumDate);  // Convertendo a data de consumo para objeto Date

  const startIndex = datesArray.findIndex((dateString) => {
    const date = new Date(dateString);
    return date.getTime() === start.getTime();
  });

  const endIndex = datesArray.findIndex((dateString) => {
    const date = new Date(dateString);
    return date.getTime() === end.getTime();
  });

  const consumIndex = datesArray.findIndex((dateString) => {
    const date = new Date(dateString);
    return date.getTime() === consum.getTime();
  });

  return {
    startIndex: startIndex !== -1 ? startIndex : null,
    endIndex: endIndex !== -1 ? endIndex : null,
    consumIndex: consumIndex !== -1 ? consumIndex : null,  // Retorna consumIndex
  };
}

export function createVlTimeArray(
  dates: Date[],
  value: number,
  startIndex: number,
  endIndex: number
) {
  const vlTimeArray = new Array(dates.length).fill(null);

  for (let i = startIndex; i <= endIndex; i++) {
    vlTimeArray[i] = value;
  }

  return vlTimeArray;
}

export const formatDate = (date?: Date): string => {
  if (!date) {
    return '';  // Retornar string vazia se a data for indefinida ou nula
  }
  return date.toLocaleDateString("en-US");
};