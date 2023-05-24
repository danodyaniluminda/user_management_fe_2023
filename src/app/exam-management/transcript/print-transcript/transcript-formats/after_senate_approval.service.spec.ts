import { After_senate_approvalService } from "./after_senate_approval.service";
import { TestBed } from "@angular/core/testing";

describe("After_senate_approvalService", () => {

  let service: After_senate_approvalService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        After_senate_approvalService
      ]
    });
    service = TestBed.get(After_senate_approvalService);

  });

  it("should be able to create service instance", () => {
    expect(service).toBeDefined();
  });

});
