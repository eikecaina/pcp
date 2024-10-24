import { Dispatch, SetStateAction } from "react";

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
  consumDate: string[] | undefined,
  datesArray: string[]
): {
  startIndex: number | null;
  endIndex: number | null;
  consumIndex: number[] | null;
} {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const startIndex = datesArray.findIndex((dateString) => {
    const date = new Date(dateString);
    return date.getTime() === start.getTime();
  });

  const endIndex = datesArray.findIndex((dateString) => {
    const date = new Date(dateString);
    return date.getTime() === end.getTime();
  });

  const consumIndex = consumDate
    ? consumDate
        .map((consum) => {
          return datesArray.findIndex((dateString) => {
            const date = new Date(dateString);
            return date.getTime() === new Date(consum).getTime();
          });
        })
        .filter((index) => index !== -1)
    : [];

  return {
    startIndex: startIndex !== -1 ? startIndex : null,
    endIndex: endIndex !== -1 ? endIndex : null,
    consumIndex: consumIndex.length > 0 ? consumIndex : null,
  };
}

export function findMatchingDates(
  datesArray: string[] | undefined,
  consumDate: string[] | undefined
): number[] {
  const logs: {
    message: string;
    date?: string;
    index?: number;
    from?: string;
    consumIndex?: number;
  }[] = [];

  if (!consumDate || consumDate.length === 0) {
    logs.push({
      message: "Datas não encontradas",
    });
    console.log(logs);
    return []; // Retorna um array vazio se consumDate estiver vazio
  }

  if (!datesArray || datesArray.length === 0) {
    logs.push({
      message: "Datas não encontradas",
    });
    console.log(logs);
    return []; // Retorna um array vazio se datesArray estiver vazio
  }

  const matchingDates = consumDate
    .map((consum, consumIndex) => {
      const consumDateObj = new Date(consum);

      const index = datesArray.findIndex((dateString) => {
        return new Date(dateString).getTime() === consumDateObj.getTime();
      });

      if (index !== -1) {
        logs.push({
          message: "Datas encontradas",
          date: consum,
          index,
          consumIndex,
          from: "datesArray",
        });
        return consumIndex; // Retorna apenas o consumIndex
      }
      return null; // Retorna null se não houver correspondência
    })
    .filter((item) => item !== null); // Filtra os itens nulos

  console.log(logs);

  return matchingDates as number[]; // Retorna todos os consumIndex encontrados
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

export const formatDateEn = (isoString: Date | string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US"); // Formato MM/DD/YYYY
};

export const formatDateBr = (isoString: Date | string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString("pt-BR"); // Formato MM/DD/YYYY
};
