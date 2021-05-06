import { Injectable } from '@nestjs/common';
import { AnnouncementDto } from './dto/announcement.dto';
import { RentRepository } from './rent-announcement.repository copy';
import { SaleRepository } from './sale-announcement.repository';
import { RentAnnouncement } from './structure/rent-announcement';
import { SaleAnnouncement } from './structure/sale-announcement';

@Injectable()
export class AnnouncementService {
  constructor(
    private rentRepository: RentRepository,
    private saleRepository: SaleRepository) { }

  renderSale(isAuth) {
    return {
      title: 'Продажа квартиры',
      layout: 'layouts/main',
      isAuth,
    };
  }

  renderRent(isAuth) {
    return {
      title: 'Аренда квартиры',
      layout: 'layouts/main',
      isAuth,
    };
  }

  async add(dto: AnnouncementDto): Promise<string> {
    if (dto.type == 'rent') {
      let announcement = new RentAnnouncement(dto);
      await this.rentRepository.add(announcement);
      return 'good';
    } else if (dto.type == 'sale') {
      let announcement = new SaleAnnouncement(dto);
      await this.saleRepository.add(announcement);
      return 'good';
    }
    return 'error';
  }
}
