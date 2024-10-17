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
  consumDate: string[] | undefined, // Permitir que consumDate seja indefinido
  datesArray: string[]
): {
  startIndex: number | null;
  endIndex: number | null;
  consumIndex: number[] | null;
} {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Encontrar o índice da data de início
  const startIndex = datesArray.findIndex((dateString) => {
    const date = new Date(dateString);
    return date.getTime() === start.getTime();
  });

  // Encontrar o índice da data de fim
  const endIndex = datesArray.findIndex((dateString) => {
    const date = new Date(dateString);
    return date.getTime() === end.getTime();
  });

  // Verifica se consumDate está definido e se não é nulo
  const consumIndex = consumDate
    ? consumDate
        .map((consum) => {
          return datesArray.findIndex((dateString) => {
            const date = new Date(dateString);
            return date.getTime() === new Date(consum).getTime();
          });
        })
        .filter((index) => index !== -1) // Filtra os índices inválidos
    : [];

  return {
    startIndex: startIndex !== -1 ? startIndex : null,
    endIndex: endIndex !== -1 ? endIndex : null,
    consumIndex: consumIndex.length > 0 ? consumIndex : null,
  };
}

export function checkConsumDates(
  consumDate: string[] | undefined, // Permitir que consumDate seja indefinido
  datesArray: string[]
): {
  consumIndex: number[] | null;
} {
  // Verifica se consumDate está definido e se não é nulo
  const consumIndex = consumDate
    ? consumDate
        .map((consum) => {
          return datesArray.findIndex((dateString) => {
            const date = new Date(dateString);
            return date.getTime() === new Date(consum).getTime();
          });
        })
        .filter((index) => index !== -1) // Filtra os índices inválidos
    : [];

  return {
    consumIndex: consumIndex.length > 0 ? consumIndex : null,
  };
}

export function createVlTimeArray(
  dates: string[],
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

export const formatDate = (isoString: Date | string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US"); // Formato MM/DD/YYYY
};
