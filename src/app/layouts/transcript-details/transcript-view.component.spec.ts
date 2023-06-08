import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TranscriptViewComponent } from "./transcript-view.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("TranscriptViewComponent", () => {

  let fixture: ComponentFixture<TranscriptViewComponent>;
  let component: TranscriptViewComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [TranscriptViewComponent]
    });

    fixture = TestBed.createComponent(TranscriptViewComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
