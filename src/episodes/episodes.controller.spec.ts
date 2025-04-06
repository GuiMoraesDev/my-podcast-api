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
    describe('when the episode is found', () => {
      const episodeId = 'id';
      const mockResult = { id: episodeId, name: 'name', featured: true };

      beforeEach(() => {
        mockFindOne.mockResolvedValue(mockResult);
      });

      it('should be called with correct params', async () => {
        await controller.findOneEpisode({ id: episodeId });
        expect(mockFindOne).toHaveBeenCalledWith({ id: episodeId });
      });

      it('should return one episode', async () => {
        const episode = await controller.findOneEpisode({ id: episodeId });
        expect(episode).toEqual({
          id: episodeId,
          name: 'name',
          featured: true,
        });
      });
    });

    describe('when the episode is not found', () => {
      beforeEach(() => {
        mockFindOne.mockResolvedValue(null);
      });

      it('should throw an error', async () => {
        void expect(controller.findOneEpisode({ id: 'id' })).rejects.toThrow(
          'Episode not found',
        );
      });
    });
  });

  describe('findAllEpisodes', () => {
    const mockResult = [
      { id: 'id', name: 'name', featured: true },
      { id: 'id2', name: 'name2', featured: false },
    ];

    beforeEach(() => {
      mockFindAll.mockResolvedValue(mockResult);
    });

    it('should be called with correct params', async () => {
      await controller.findAllEpisodes();
      expect(mockFindAll).toHaveBeenCalledWith();
    });

    it('should return all episodes', async () => {
      const episode = await controller.findAllEpisodes();
      expect(episode).toEqual(mockResult);
    });
  });

  describe('createNewEpisode', () => {
    describe('when the episode is created', () => {
      const mockResult = [{ id: 'id', name: 'name', featured: true }];

      beforeEach(() => {
        mockCreate.mockResolvedValue(mockResult);
      });

      it('should create an episode', async () => {
        const episode = await controller.createNewEpisode({
          name: 'name',
          featured: true,
        });
        expect(episode).toEqual(mockResult);
      });
    });
  });
});
