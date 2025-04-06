import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { Episode } from './entity/episode.entity';
import { EpisodeDTO } from './dto/episode.dto';

@Controller('episodes')
export class EpisodesController {
  constructor(private episodesService: EpisodesService) {}

  @Get()
  async findAllEpisodes() {
    return this.episodesService.findAll();
  }

  @Get(':id')
  async findOneEpisode(@Param() { id }: Pick<Episode, 'id'>) {
    const episode = await this.episodesService.findOne({ id });

    if (!episode) {
      throw new Error('Episode not found');
    }

    return episode;
  }

  @Post()
  async createNewEpisode(@Body() { name, featured }: EpisodeDTO) {
    return this.episodesService.create({ name, featured });
  }
}
