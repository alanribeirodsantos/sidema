import { Component } from '@angular/core';

@Component({
  selector: 'reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.scss']
})
export class ReportsListComponent {

  reportsList2:any[] = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      description: "Suspendisse potenti. Integer urna tellus, porttitor a convallis vitae, tristique ac ante. Vivamus efficitur aliquet lectus, sit amet maximus arcu interdum placerat. Aenean iaculis enim neque, eget euismod arcu maximus a. Cras vel varius magna. Nunc fermentum ligula tempor, suscipit nisl imperdiet, gravida libero. Aenean nisl turpis, consectetur ac gravida eget, lacinia eget tellus. Morbi imperdiet aliquet neque quis congue.",
      category: "historical-patrimony",
      location: "Rua Francisco Batista de Queiroz, 856 - Alto Boa Vista",
      numberOfSupporters: 35,
      status: "received",
    },
    {
      id: 2,
      title: "Nunc nulla ipsum, congue non dui vitae, elementum faucibus elit.",
      description: "Curabitur ut tellus scelerisque, semper odio at, iaculis nibh. Sed luctus vulputate quam, nec dignissim erat dapibus eget. Quisque lobortis posuere libero dictum tristique. Fusce ullamcorper felis ut dignissim faucibus.",
      category: "monoliths",
      location: "Rua Francisco Batista de Queiroz, 856 - Alto Boa Vista",
      numberOfSupporters: 20,
      status: "received",
    },
    {
      id: 3,
      title: "Nulla lacinia est non pretium volutpat.",
      description: "Phasellus feugiat, libero eu rutrum efficitur, urna erat pulvinar ex, ut luctus erat neque at neque. Aenean fermentum ante sit amet turpis venenatis aliquet. Vestibulum nulla velit, pellentesque sit amet pellentesque ac, mattis eget ante.",
      category: "water-resources",
      location: "Rua Francisco Batista de Queiroz, 856 - Alto Boa Vista",
      numberOfSupporters: 19,
      status: "verifying-veracity",
    },
    {
      id: 4,
      title: "Donec tempus tempor quam, quis rutrum justo.",
      description: "Fusce nec auctor velit, sed tristique sapien. Aliquam commodo ex erat, placerat dictum erat consectetur sit amet.",
      category: "vegetation",
      location: "Rua Francisco Batista de Queiroz, 856 - Alto Boa Vista",
      numberOfSupporters: 18,
      status: "filed",
    },
    {
      id: 5,
      title: "Nulla lacinia est non pretium volutpat.",
      description: "Phasellus feugiat, libero eu rutrum efficitur, urna erat pulvinar ex, ut luctus erat neque at neque. Aenean fermentum ante sit amet turpis venenatis aliquet. Vestibulum nulla velit, pellentesque sit amet pellentesque ac, mattis eget ante.",
      category: "water-resources",
      location: "Rua Francisco Batista de Queiroz, 856 - Alto Boa Vista",
      numberOfSupporters: 7,
      status: "resolved",
    },
    {
      id: 6,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      description: "Suspendisse potenti. Integer urna tellus, porttitor a convallis vitae, tristique ac ante. Vivamus efficitur aliquet lectus, sit amet maximus arcu interdum placerat. Aenean iaculis enim neque, eget euismod arcu maximus a. Cras vel varius magna. Nunc fermentum ligula tempor, suscipit nisl imperdiet, gravida libero. Aenean nisl turpis, consectetur ac gravida eget, lacinia eget tellus. Morbi imperdiet aliquet neque quis congue.",
      category: "historical-patrimony",
      location: "Rua Francisco Batista de Queiroz, 856 - Alto Boa Vista",
      numberOfSupporters: 6,
      status: "in-progress",
    }
  ];

}
