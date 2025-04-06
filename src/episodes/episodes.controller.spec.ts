import { Test, TestingModule } from '@nestjs/testing';
import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';
import { ConfigModule } from '@/config/config.module';

describe('EpisodesController', () => {
  let controller: EpisodesController;

  const mockFindOne = jest.fn();
  const mockFindAll = jest.fn();
  const mockCreate = jest.fn();

  const mockEpisodesService = {
    findOne: mockFindOne,
    findAll: mockFindAll,
    create: mockCreate,
  };

  beforeEach(async () => {
    jest.resetAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [EpisodesController],
      providers: [{ provide: EpisodesService, useValue: mockEpisodesService }],
    }).compile();

    controller = module.get<EpisodesController>(EpisodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOneEpisode', () => {
    const episodeId = 'id';
    const mockResult = { id: episodeId, name: 'name', featured: true };

    beforeEach(() => {
      mockFindOne.mockReturnValue(mockResult);
    });

    it('should be called with correct params', () => {
      controller.findOneEpisode({ id: episodeId });
      expect(mockFindOne).toHaveBeenCalledWith({ id: episodeId });
    });

    it('should return one episode', () => {
      const episode = controller.findOneEpisode({ id: episodeId });
      expect(episode).toEqual({ id: episodeId, name: 'name', featured: true });
    });
  });

  describe('findAllEpisodes', () => {
    const mockResult = [
      { id: 'id', name: 'name', featured: true },
      { id: 'id2', name: 'name2', featured: false },
    ];

    beforeEach(() => {
      mockFindAll.mockReturnValue(mockResult);
    });

    it('should be called with correct params', () => {
      controller.findAllEpisodes();
      expect(mockFindAll).toHaveBeenCalledWith();
    });

    it('should return all episodes', () => {
      const episode = controller.findAllEpisodes();
      expect(episode).toEqual(mockResult);
    });
  });

  describe('createNewEpisode', () => {
    const mockResult = [{ id: 'id', name: 'name', featured: true }];

    beforeEach(() => {
      mockCreate.mockReturnValue(mockResult);
    });

    it('should create an episode', () => {
      const episode = controller.createNewEpisode({
        name: 'name',
        featured: true,
      });
      expect(episode).toEqual(mockResult);
    });
  });
});
