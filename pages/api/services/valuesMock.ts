import { NextApiRequest, NextApiResponse } from "next";

export default function hanlderMock(req: NextApiRequest, res: NextApiResponse) {
  const caractName = [
    {
      caractDs: "Meio",
    },
    {
      caractDs: "Potência",
    },
    {
      caractDs: "Classe de tensão",
    },
  ];
  
  res.status(200).json({
    result: [
      {
        title: `${caractName[0].caractDs}: Óleo`,
        key: "0-0",
        children: [
          {
            title: `${caractName[1].caractDs}: 0 > 15`,
            key: "0-0-0",
            children: [
              {
                title: `${caractName[2].caractDs}: 0 > 15`,
                key: "0-0-0-0",
              },
            ],
          },
        ],
      },
      {
        title: `${caractName[0].caractDs}: Seco`,
        key: "0-1",
        children: [
          {
            title: `${caractName[1].caractDs}: 0 > 500`,
            key: "0-1-0",
            children: [
              {
                title: `${caractName[2].caractDs}: 0 > 15`,
                key: "0-0-0-1",
              },
            ],
          },
        ],
      },
    ],
  });
}
