import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { Episode } from './entity/episode.entity';
import { EpisodeDTO } from './dto/episode.dto';

@Controller('episodes')
export class EpisodesController {
  constructor(private episodesService: EpisodesService) {}

  @Get()
  findAllEpisodes() {
    return this.episodesService.findAll();
  }

  @Get(':id')
  findOneEpisode(@Param() { id }: Pick<Episode, 'id'>) {
    return this.episodesService.findOne({ id });
  }

  @Post()
  createNewEpisode(@Body() { name, featured }: EpisodeDTO) {
    return this.episodesService.create({ name, featured });
  }
}
