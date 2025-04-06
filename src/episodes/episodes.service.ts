import { Injectable } from '@nestjs/common';
import { Episode } from './entity/episode.entity';
import { EpisodeDTO } from './dto/episode.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class EpisodesService {
  private episodes: Episode[] = [];

  async findOne({ id }: Pick<Episode, 'id'>) {
    return this.episodes.find((episode) => episode.id === id);
  }

  async findAll() {
    return this.episodes;
  }

  async create({ name, featured }: EpisodeDTO) {
    const episodesArray = [...this.episodes];

    const hasSameNameInArray = episodesArray.find(
      (episode) => episode.name === name,
    );

    if (hasSameNameInArray) {
      throw new Error(`episode name ${name} already exists`);
    }

    this.episodes = [
      {
        id: randomUUID(),
        name,
        featured,
      },
      ...episodesArray,
    ];

    return this.episodes;
  }
}
