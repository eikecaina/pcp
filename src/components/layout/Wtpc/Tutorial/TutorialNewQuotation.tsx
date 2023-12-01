import { TourProps } from 'antd';
import { useRef } from 'react';

const TutorialTour = () => {

    const refs = Array.from({ length: 15 }, () => useRef(null));

    const steps: TourProps['steps'] = [
        {
            title: 'Preencha os campos',
            description: 'Os campos devem ser preenchidos para o calculo da cotação',
            target: () => refs[0].current,
        },
        {
            title: 'Novo Item na lista',
            description: 'Adiciona um item na lista',
            target: () => refs[1].current,
        },
        {
            title: 'Configure o item',
            description: 'Configure o item atual selecionado na lista',
            target: () => refs[2].current,
        },
        {
            title: 'Excluir o item',
            description: 'Exclue o item atual selecionado, cuidado!',
            target: () => refs[3].current,
        },
        {
            title: 'Configure o produto',
            description: 'Configuração do produto do item selecionado',
            target: () => refs[4].current,
        },
        {
            title: 'Calcule',
            description: 'Calcule a cotação com todos os itens configurados',
            target: () => refs[5].current,
        },
        {
            title: 'Cotação',
            description: 'Exibe detalhes de toda a cotação',
            target: () => refs[6].current,
        },
    ];

    return (
        { refs, steps }
    )
}

export default TutorialTour
