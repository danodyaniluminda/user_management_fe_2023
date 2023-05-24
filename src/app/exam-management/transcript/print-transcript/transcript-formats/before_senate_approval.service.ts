import { Injectable } from "@angular/core";
import * as pdfMake from "pdfmake/build/pdfmake";
import { PrintCommonService } from "../printer/printer_commonData.service";
import  * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as docx from 'docx';
import { TableRow, TableCell, WidthType, Paragraph, Table, VerticalAlign, PageNumber, LevelFormat, AlignmentType, NumberFormat, Header, ImageRun, Footer, TextRun, Tab, TabStopType, TabStopPosition, SectionType, HeadingLevel } from "docx";
import * as saveAs from "file-saver";
import { PrintTranscriptService } from "../view-print-transcript-details/print-transcript.service";

/**
 * @description
 * @class
 */
@Injectable({
  providedIn: 'root'
})
export class Before_senate_approvalService {

  constructor(private commonData:PrintCommonService,private printTranscriptService:PrintTranscriptService) {
    (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
  }
  gpaDetailsjsonData = [
    {
      grade:[
        {value:'A+'},{value:'A'},{value:'A-'},{value:'B+'},{value:'B'},{value:'B-'},{value:'C+'},{value:'C'},{value:'C-'},{value:'D+'},{value:'D'},{value:'E'},{value:'EX'}
      ],
      gradeValue:[
      ],
      marks:[],
    }
    ,
    {
      grade:[],
      gradeValue:[
        {value:'4.00'},{value:'4.00'},{value:'3.70'},{value:'3.30'},{value:'3.00'},{value:'2.70'},{value:'2.30'},{value:'2.00'},{value:'1.70'},{value:'1.30'},{value:'1.00'},{value:'0.00'},{value:'0.00'}
      ],
      marks:[],
    },
    {
      grade:[],
      gradeValue:[],
      marks:[
        {value:'>80'},{value:'70-79'},{value:'65-69'},{value:'60-64'},{value:'55-59'},{value:'50-54'},{value:'45-49'},{value:'40-44'},{value:'35-39'},{value:'30-34'},{value:'20-29'},{value:'00-19'},{value:''}

      ],
    }
  ];

  async  generateWordDoc(data:any,applicantId:any,resultType:any) {
    const rows = [];
    const rows1 = new TableRow({
      children: [
          new TableCell({
              width: {
                  size: 800,
                  type: WidthType.PERCENTAGE,
              },
              children: [new Paragraph("Course Code")],
          }),
          new TableCell({
              width: {
                  size: 2500,
                  type: WidthType.PERCENTAGE,
              },
              children: [new Paragraph("Course Title")],
          }),
          new TableCell({
            width: {
                size: 800,
                type: WidthType.PERCENTAGE,
            },
            children: [new Paragraph("Credit Rating")],
        }),
        new TableCell({
          width: {
              size: 2500,
              type: WidthType.PERCENTAGE,
          },
          children: [new Paragraph("Grade")],
      }),
      ],
  });
  rows.push(rows1);

    for (let i = 0; i < data.academicPerformanceDetails.length; i++) {
      const courseDetails=data.academicPerformanceDetails[i].courseDetails;
      const rowLevel = new docx.TableRow({
        children: [
          new docx.TableCell({
          children: [new docx.Paragraph(String(data.academicPerformanceDetails[i].level))],
          columnSpan: 4,
        })],
      });
      rows.push(rowLevel);
      for (let j = 0; j < courseDetails.length; j++) {
        let rowCourse = new docx.TableRow({
          children: [
            new docx.TableCell({
            children: [new docx.Paragraph(courseDetails[j].courseCode)],
          }),
          new docx.TableCell({
            children: [new docx.Paragraph(courseDetails[j].courseTitle)],
          }),
          new docx.TableCell({
            children: [new docx.Paragraph(String(courseDetails[j].courseCredit))],
          }),
          new docx.TableCell({
            children: [new docx.Paragraph(String(courseDetails[j].gradeGpValue))],
          })


        ],
        });
        rows.push(rowCourse);
      }
      let rowEmpty = new docx.TableRow({
        children: [
          new docx.TableCell({
          children: [new docx.Paragraph("")],
        }),
        new docx.TableCell({
          children: [new docx.Paragraph("")],
        }),
        new docx.TableCell({
          children: [new docx.Paragraph("")],
        }),
        new docx.TableCell({
          children: [new docx.Paragraph("")],
        })


      ],
      });

      rows.push(rowEmpty);
    }

    const academicPerformanceDetails = new docx.Table({
      width: {
        size: 100,
        type: docx.WidthType.PERCENTAGE,
      },

      rows,
    });





  const personalDetails = new Table({
    width: {
      size: 100,
      type: docx.WidthType.PERCENTAGE,
    },
    margins:{top:100},
    rows: [
        new TableRow({
            children: [
                new TableCell({
                    width: {
                        size: 800,
                        type: WidthType.PERCENTAGE,
                    },
                    children: [new Paragraph("Student Name: Rev./Mr./Ms.")],
                }),
                new TableCell({
                  columnSpan:3,
                    width: {
                        size: 2500,
                        type: WidthType.PERCENTAGE,
                    },
                    children: [new Paragraph(data.personalDetails.denotedByInitials +' '+ data.personalDetails.lastName)],
                }),
            ],
        }),
        new TableRow({
            children: [
                new TableCell({
                    width: {
                        size: 800,
                        type: WidthType.PERCENTAGE,
                    },
                    children: [new Paragraph("Student Registration No.:")],
                }),
                new TableCell({
                  columnSpan:3,
                    width: {
                        size: 2500,
                        type: WidthType.PERCENTAGE,
                    },
                    children: [new Paragraph(data.personalDetails.registrationNumber!)],
                }),
            ],
        }),
        new TableRow({
          children: [
              new TableCell({
                  width: {
                      size: 800,
                      type: WidthType.PERCENTAGE,
                  },
                  children: [new Paragraph("Medium:")],
              }),
              new TableCell({
                columnSpan:3,
                  width: {
                      size: 2500,
                      type: WidthType.PERCENTAGE,
                  },
                  children: [new Paragraph(data.personalDetails.mediumText!)],
              }),
          ],
      }),
      new TableRow({
        children: [
            new TableCell({
                width: {
                    size: 800,
                    type: WidthType.PERCENTAGE,
                },
                children: [new Paragraph("Field of Specialisation/ Discipline:")],
            }),
            new TableCell({
              columnSpan:3,
                width: {
                    size: 2500,
                    type: WidthType.PERCENTAGE,
                },
                children: [new Paragraph(data.personalDetails.specialization_description!)],
            }),
        ],
    }),

    ],
});


const gpaDetails = new docx.Table({
width: {
  size: 100,
  type: docx.WidthType.PERCENTAGE,
},
rows: [
  new docx.TableRow({

    children: [
      new docx.TableCell({
        verticalAlign: VerticalAlign.CENTER,
        width: {
          size: 700,
          type: WidthType.DXA,
      },
        children: [new docx.Paragraph('Grade/Status')]
      }),

      ...this.gpaDetailsjsonData[0].grade.map((grade, index) => {
        return new TableCell({
              children: [new Paragraph(grade.value)],

        });
      }),

    ]
  }),

  new docx.TableRow({

    children: [
      new docx.TableCell({
        verticalAlign: VerticalAlign.CENTER,
        width: {
          size: 700,
          type: WidthType.DXA,
      },
        children: [new docx.Paragraph('Marks')]
      }),

      ...this.gpaDetailsjsonData[1].gradeValue.map((gradeValue, index) => {
        return new TableCell({
              children: [new Paragraph(gradeValue.value)],

        });
      }),

    ]
  }),
  new docx.TableRow({

    children: [
      new docx.TableCell({
        verticalAlign: VerticalAlign.CENTER,
        width: {
          size: 700,
          type: WidthType.DXA,
      },
        children: [new docx.Paragraph('Marks')]
      }),

      ...this.gpaDetailsjsonData[2].marks.map((marks, index) => {
        return new TableCell({
              children: [new Paragraph(marks.value)],

        });
      }),

    ]
  }),
]
});

const TOTAL_PAGES =PageNumber.TOTAL_PAGES;
const CURRENT_PAGE = PageNumber.CURRENT;

const currentDate = new Date();
const dateString = currentDate.toLocaleDateString();
const fullName="Amarasekara Mudiyansege Gihan Samarasekara";
const programmeName="BTech";
  const document = new docx.Document({
    numbering: {
      config: [
          {
              reference: "my-crazy-numbering",
              levels: [
                  {
                      level: 0,
                      format:LevelFormat.LOWER_ROMAN,
                      text: "%1",
                      alignment: AlignmentType.START,
                      style: {
                          paragraph: {
                              indent: { left: 720, hanging: 260 },
                          },
                      },
                  },
                  {
                      level: 1,
                      format:LevelFormat.LOWER_ROMAN,
                      text: "%2.",
                      alignment: AlignmentType.START,
                      style: {
                          paragraph: {
                            indent: { left: 720, hanging: 260 },
                          },
                      },
                  },
                  {
                      level: 2,
                      format:LevelFormat.LOWER_ROMAN,
                      text: "%3)",
                      alignment: AlignmentType.START,
                      style: {
                          paragraph: {
                            indent: { left: 720, hanging: 260 },
                          },
                      },
                  }
              ],
          },
          {
            reference: "my-crazy-numbering2",
            levels: [
                {
                    level: 0,
                    format:LevelFormat.LOWER_ROMAN,
                    text: "%1",
                    alignment: AlignmentType.START,
                    style: {
                        paragraph: {
                            indent: { left: 720, hanging: 260 },
                        },
                    },
                },
                {
                    level: 1,
                    format:LevelFormat.LOWER_ROMAN,
                    text: "%2.",
                    alignment: AlignmentType.START,
                    style: {
                        paragraph: {
                          indent: { left: 720, hanging: 260 },
                        },
                    },
                },
                {
                    level: 2,
                    format:LevelFormat.LOWER_ROMAN,
                    text: "%3)",
                    alignment: AlignmentType.START,
                    style: {
                        paragraph: {
                          indent: { left: 720, hanging: 260 },
                        },
                    },
                }
            ],
        },
      ],
  },
    sections: [
      {
        properties: {
          titlePage: true,
          page: {
            pageNumbers: {
                start: 1,
                formatType: NumberFormat.DECIMAL,
            },
        },
         },
        headers: {
            first: new Header({
                children: [
                    new Paragraph({
                        children: [
                          new ImageRun({
                            data: this.commonData.mainHeader,
                            transformation: {
                                width: 600,
                                height: 100,
                            },

                        }),
                        ],
                    }),
                ],
            }),
            default: new Header({
                children: [
                    new Paragraph({
                        children: [
                          new ImageRun({
                            data: this.commonData.secondHeader,
                            transformation: {
                                width: 600,
                                height: 50,
                            },

                        }),
                        ],
                    }),
                ],
            }),
        },
        footers: {
            first: new Footer({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: 'Examinations Division – The Open University of Sri Lanka.',
                        font:"Monotype Corsiva"
                      }),
                      new Tab(),
                      new Tab(),
                      new TextRun({
                        children: ["                                                                                            Page", PageNumber.CURRENT,"/",PageNumber.TOTAL_PAGES],
                        font:"Monotype Corsiva"
                    }),
                    ]
                  }),
                ],
            }),
            default: new Footer({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({

                        text: 'Examinations Division – The Open University of Sri Lanka.',
                        font:"Monotype Corsiva"
                      }),
                      new Tab(),
                      new Tab(),
                      new TextRun({
                        children: ["                                                                                            Page", PageNumber.CURRENT,"/",PageNumber.TOTAL_PAGES],
                        font:"Monotype Corsiva"
                    }),
                    ]
                  }),
                ],
            }),
        },

        children: [
          new Paragraph({
            spacing: {
              before: 250,
          },
            children: [
                new TextRun({
                    text:"Date : "+dateString,
                }),
            ],
        }),

          this.createHeading("To Whom It May Concern:"),

          //Show Qualification Details
          this.createSubHeading("Interim Results of (Qualification)"),
          personalDetails,

          new Paragraph({
            spacing: {
              before: 250,
          },
            children: [
                new TextRun({
                    text:"This is to certify that "+data.personalDetails.denotedByInitials+' '+ data.personalDetails.lastName+" has obtained the following grades or exemptions in the under mentioned courses of the "+data.personalDetails.programmeTitle+", conducted by The Open University of Sri Lanka.",
                }),
            ],
        }),

        new Paragraph({
          spacing: {
            before: 250,
        },
          children: [
              new TextRun({
                  text:"Please note that the Award of the "+data.personalDetails.qualifications+" relevant for this student is Yet to be Processed as at "+dateString+",.",
              }),
          ],
      }),


         //Show Academic Performance Details:
         this.createSubHeading("Academic Performance Details:"),
         academicPerformanceDetails,

         new Paragraph({
          children: [
              new TextRun({
                  text: "*Subject to confirmation by the University Senate.",
                  italics:true,
                  bold:true
              }),
          ],
      }),


   //Show Key to Grades/Status and Grade Point Values:
   this.createSubHeading("Key to Grades/Status, Grade Point Values and Mark Ranges:"),
   gpaDetails,
   new Paragraph({
    spacing:{
      after:150,
    },
    children: [
        new TextRun({
            text: "Grades A+ to C are the pass grades.",
            italics:true,
            bold:true
        }),
    ],
}),

new Table({
  borders:{
    top: { style: docx.BorderStyle.NONE },
    bottom: { style: docx.BorderStyle.NONE },
    left: { style: docx.BorderStyle.NONE },
    right: { style: docx.BorderStyle.NONE },
    insideHorizontal:{ style: docx.BorderStyle.NONE },
    insideVertical:{ style: docx.BorderStyle.NONE },
  },
  width: {
    size: 100,
    type: docx.WidthType.PERCENTAGE,
  },
  rows: [
      new TableRow({
          children: [
              new TableCell({
                width: {
                  size: 50,
                  type: WidthType.AUTO,
              },
                  children: [new Paragraph("RX")],
              }),
              new TableCell({
                width: {
                  size: 50,
                  type: WidthType.AUTO,
              },
                children: [new Paragraph("- Student has passed the Continuous Assessment,but absent for the Final Examination,hence required to sit the Final Examination.")],
            }),
          ],
      }),
      new TableRow({
        children: [
            new TableCell({
              width: {
                size: 50,
                type: WidthType.AUTO,
            },
                children: [new Paragraph("EX")],
            }),
            new TableCell({
              width: {
                size: 50,
                type: WidthType.AUTO,
            },
              children: [new Paragraph("- Exemption has been granted after evaluation of previous qualifications obtained by the student.")],
          }),
        ],
    }),
  ],
}),


         new Paragraph({
          spacing:{
            before:400,
            after:250
          },
          tabStops: [
            {
              type: TabStopType.RIGHT,
              position: TabStopPosition.MAX
            }
          ],
          children: [
            new TextRun({
              text: "This letter is issued at the request of Rev./Mr./Ms. "+data.personalDetails.denotedByInitials+' '+ data.personalDetails.lastName+"",
            })
          ]
        }),
        new Paragraph({
          children: [
              new TextRun({
                  text: "Deputy Registrar/ Senior Assistant Registrar/Assistant Registrar",
                  bold:true
              })
          ],
      }),
      new Paragraph({
        children: [
            new TextRun({
              text: "Examinations Division",
              bold:true
          })
        ],
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "For Registrar",
          bold:true
      }),
      ],
  }),

        ],
    },
    {
        properties: {
            type: SectionType.CONTINUOUS,
        },
        children: [


        ],
    },
],
  });

  // Add a paragraph to the document
  //const paragraph = new docx.Paragraph('Hello, World!');
  //document.addParagraph(paragraph);

  // Generate a blob for the document
const blob =await docx.Packer.toBlob(document);
const docxName=applicantId+'-'+resultType;
  // Save the blob as a Word file
 saveAs(blob, docxName);

}
public createBullet(text: string): Paragraph {
  return new Paragraph({
    text: text,
    bullet: {
      level: 1
    }
  });
}


public createInstitutionHeader(
  institutionName: string,
  dateText: string
): Paragraph {
  return new Paragraph({
    thematicBreak: true,
    spacing:{
      before:300,
    },
    tabStops: [
      {
        type: TabStopType.RIGHT,
        position: 6500
      },

    ],
    children: [
      new TextRun({
        text: institutionName,
        bold: true
      }),
      new TextRun({
        text: `\t${dateText}`,
        bold: true
      }),
    ]
  });
}

public createInstitutionHeader1(
  institutionName1: string
): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text: institutionName1,
        font:"Monotype Corsiva"
      }),
      new Tab(),
      new Tab(),
      new TextRun({
        children: ["Page", PageNumber.CURRENT,"/",PageNumber.TOTAL_PAGES],
        font:"Monotype Corsiva"
    }),
    ]
  });
}

public createFooterNumbering(): Paragraph {
  return new Paragraph({
    tabStops: [
      {
        position: TabStopPosition.MAX, // 1 inch
        type: docx.TabStopType.LEFT,
      },
    ],
    children: [
      new TextRun({
        text: "institutionName",
        bold: true
      }),
      new TextRun({
        text:"fffff",
        bold: true
      })
    ]
  });
}




public createHeading(text: string): Paragraph {
  return new Paragraph({
    alignment:AlignmentType.LEFT,
    spacing:{
      before:300,
    },
    text: text,
    heading: HeadingLevel.HEADING_2,
  });
}

public createSubHeading(text: string): Paragraph {
  return new Paragraph({
    spacing:{
      before:500,
    },
    thematicBreak: true,
    tabStops: [
      {
        type: TabStopType.RIGHT,
        position: TabStopPosition.MAX
      }
    ],
    children: [
      new TextRun({
        text: text,
        bold: true
      }),

    ]
  });
}


public createSkillList(skills: any[]): TableRow {
  return new TableRow({
    children: [
      new docx.TableCell({
        columnSpan:4,
        children: [new docx.Paragraph("ggg")] }),
    ],
  })
}
}
