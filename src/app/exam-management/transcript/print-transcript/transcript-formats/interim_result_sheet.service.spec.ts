import { Interim_result_sheetService } from "./interim_result_sheet.service";
import { TestBed } from "@angular/core/testing";

describe("Interim_result_sheetService", () => {

  let service: Interim_result_sheetService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Interim_result_sheetService
      ]
    });
    service = TestBed.get(Interim_result_sheetService);

  });

  it("should be able to create service instance", () => {
    expect(service).toBeDefined();
  });

});
