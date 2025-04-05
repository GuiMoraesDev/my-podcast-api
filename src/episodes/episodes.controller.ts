import { Body, Controller, Get, Param, Post } from '@nestjs/common';

type FindOneEpisodeParamProps = {
  id: string;
};

type CreateNewEpisodesBodyProps = {
  name: string;
};

@Controller('episodes')
export class EpisodesController {
  @Get()
  findAllEpisodes() {
    return 'All episodes has been found';
  }

  @Get(':id')
  findOneEpisode(@Param() { id }: FindOneEpisodeParamProps) {
    return `The episode with id: ${id} has been found`;
  }

  @Post()
  createNewEpisode(@Body() { name }: CreateNewEpisodesBodyProps) {
    return `Episode created with name: ${name}`;
  }
}
