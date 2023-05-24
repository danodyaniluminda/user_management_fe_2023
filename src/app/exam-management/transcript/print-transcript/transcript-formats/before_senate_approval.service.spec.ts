import { Before_senate_approvalService } from "./before_senate_approval.service";
import { TestBed } from "@angular/core/testing";

describe("Before_senate_approvalService", () => {

  let service: Before_senate_approvalService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Before_senate_approvalService
      ]
    });
    service = TestBed.get(Before_senate_approvalService);

  });

  it("should be able to create service instance", () => {
    expect(service).toBeDefined();
  });

});
