import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {

  faqList = [
    {
      question: "O que eu devo denunciar no SIDEMA?",
      answer: "O SIDEMA recebe denúncias referentes a crimes ambientais cometidos nas áreas de Unidade de Conservação e de Proteção Ambiental da cidade de Quixadá, além de crimes ocorridos contra natureza dentro do espaço urbano da cidade. Os crimes denunciados no SIDEMA podem envolver poluição, desperdício de água pública, construção irregular em monólitos, queimada, desmatamento, ocupação ilegal de patrimônio da cidade, além de depredação desses patrimônios ou dos monólitos. "    
    },
    {
      question:"Para quais órgãos são direcionadas as denúncias?",
      answer:"O SIDEMA encaminha as denúncias para 3 órgãos: SEMA, SEDUMA e DNOCS. Denúncias referentes aos Monólitos são direcionadas à SEMA, denúncias referentes a Patrimônio ficam a cargo da SEDUMA, denúncias sobre Recursos Hídricos são encaminhadas para o DNOCS e denúncias sobre Vegetação são direcionadas a todos os órgãos, pois cada um deles fiscaliza uma área diferente da cidade. "
    },
    {
      question:"Quais são as Unidades de Conservação de Quixadá?",
      answer:"Unidades de Conservação (UC) são áreas naturais que precisam ser protegidas devido as suas características especiais. Em Quixadá, temos os Monumentos Naturais (Monólitos) estabelecidos como UC por meio do decreto DECRETO Nº 26.805, de 25 de outubro de 2002. Esses monólitos foram definidos como UC devido aos seus valores ecológicos e turísticos, além de serem uma riqueza natural que garante o equilíbrio ecológico do Sertão Central."
    },
    {
      question: "Quais são as Áreas de Proteção Ambiental de Quixadá?",
      answer: "Áreas de Proteção Ambiental (APA), são áreas protegidas, previstas na legislação brasileira como parte do Sistema Nacional de Unidades de Conservação. Isso significa dizer que, a UC referente aos monólitos de Quixadá é também uma APA. Além disso, á área que hoje corresponde ao açude Cedro e abrange o monólito conhecido como Pedra da Galinha Choca, também está abrangido por essa área de proteção."
    }
  ];
}
