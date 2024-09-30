import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "src/prisma/prisma.service";

describe("PrismaService", () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  it('PrismaService - should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should call onModuleInit and onModuleDestroy", async () => {
    const connectSpy = jest.spyOn(service, "$connect").mockImplementation(jest.fn());
    const disconnectSpy = jest
      .spyOn(service, '$disconnect')
      .mockImplementation(jest.fn());

    await service.onModuleInit();
    expect(connectSpy).toHaveBeenCalled();

    await service.onModuleDestroy();
    expect(disconnectSpy).toHaveBeenCalled();
  });
});
