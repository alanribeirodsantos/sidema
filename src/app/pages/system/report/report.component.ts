import { Component } from '@angular/core';
import { Report } from '../../../backend/models/report';

@Component({
  selector: 'report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {

  commentary: string;

  /* Eu coloquei alguns atributos do modelo de denúncia aqui, ainda que eles não existam no model, pois eles são necessários nessa página. */
  report = {
    id: 8,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    description: "Suspendisse potenti. Integer urna tellus, porttitor a convallis vitae, tristique ac ante. Vivamus efficitur aliquet lectus, sit amet maximus arcu interdum placerat. Aenean iaculis enim neque, eget euismod arcu maximus a. Cras vel varius magna. Nunc fermentum ligula tempor, suscipit nisl imperdiet, gravida libero. Aenean nisl turpis, consectetur ac gravida eget, lacinia eget tellus. Morbi imperdiet aliquet neque quis congue.",
    category: "historical-patrimony",
    media: [
      {
        src:'http://vilamulher.uol.com.br/imagens/vilamulher/thumbs/2015/04/13/os-caroes-de-britney-spears-10-momentos-da-diva13-5-thumb-570.jpg',
        type: 'img'
      },
      {
        src: 'https://storage.googleapis.com/coverr-main/mp4/Noted.mp4',
        type: 'video'
      },
      {
        src: 'https://cdn.dbr.ee/d/s/uCDc/original_Demo%20235.mp3?token=vTIXFUFMLFEEn0bC_LXqlQ&expires=1526457956',
        type: 'audio'
      }
    ],
    location: {
      place: "Quixadá - CE, Brasil",
      region: "Centro",
      street: "R. Rodrigues Júnior",
      number: 34,
      complements: "Não informado"
    },
    numberOfSupporters: 15,
    status: "verifying-veracity",
    log: [
      {
        author: "Você",
        date: "14/03/2018",
        hour: "10h28min",
        message: "registou a denúncia."
      },
      {
        author: "SEMA",
        date: "16/03/2018",
        hour: "12h28min",
        message: "alterou o estado dessa denúncia para verificando veracidade."
      }
    ],
    comments: [
      {
        author: "Você",
        date: "14/03/2018",
        hour: "10h28min",
        message: "Lorem ipsum solor sit amet."
      }
    ],
    reportDate: "14/03/2018",
    occurrenceDate: "12/03/2018",
    organ: "SEMA"
  }

  sendCommentary(){
    let date = new Date();
    this.report.comments.push({
      author: "Você", //precisa verificar se é orgão ou usuário comum.
      date: date.toJSON().slice(0,10).replace(/-/g,'/').split('/').reverse().join('/'),
      hour: date.getHours() + 'h' + date.getMinutes() + 'min',
      message: this.commentary
    })
  }
}
