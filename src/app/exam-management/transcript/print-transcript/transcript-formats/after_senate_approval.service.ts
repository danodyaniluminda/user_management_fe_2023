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
export class After_senate_approvalService {

  constructor(private commonData:PrintCommonService,private printTranscriptService:PrintTranscriptService) {
    (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
  }
  bbbbb:any;
  additionalRequirementsHeading:any;
  additionalRequirementsTable:any;
  additionalRequirementsGPATableHeading:any;
  additionalRequirementsGPATable:any;
  coursejsonContinuData= [
    {
      courseCode: "LEE3410",
      grade: "A-",
      creadit: "6",
      title: "English for General Academic Purposes Pramod"
    },
    {
      courseCode: "LEE5010",
      grade: "C-",
      creadit: "3",
      title: "English for General Academic Purposes Pramod"
    }
  ];
  //this.generateEnglishGPATable(gg.gpaDetailsjsonDataEnglish),

  async  generateWordDoc(data:any,applicantId:any,resultType:any,gg:any) {

//console.log("course Details lenght",gg.coursejsonDataEnglish);
//console.log("englishcourse Details lenght",gg.gpaDetailsjsonDataEnglish.lenght);
    const rows = [];

    const rows1 = new TableRow({
      children: [
          new TableCell({
              width: {
                  size: 800,
                  type: WidthType.PERCENTAGE,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      font:"Book Antiqua",
                      size:20,
                      bold:true,
                      text: "Course Code",
                    }),
                  ]
                })
            ],
          }),
          new TableCell({
              width: {
                  size: 3000,
                  type: WidthType.PERCENTAGE,
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      font:"Book Antiqua",
                      size:20,
                      bold:true,
                      text: "Course Title",
                    }),
                  ]
                })
              ],
          }),
          new TableCell({
            width: {
                size: 400,
                type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    font:"Book Antiqua",
                    size:20,
                    bold:true,
                    text: "Credit Rating",
                  }),
                ]
              })
            ],
        }),
        new TableCell({
          width: {
              size: 400,
              type: WidthType.PERCENTAGE,
          },
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  font:"Book Antiqua",
                  size:20,
                  bold:true,
                  text: "Grade",
                }),
              ]
            })
          ],
      }),
      ],
  });
  rows.push(rows1);

    for (let i = 0; i < data.academicPerformanceDetails.length; i++) {
      const courseDetails=data.academicPerformanceDetails[i].courseDetails;
      const rowLevel = new docx.TableRow({
        children: [
          new docx.TableCell({
          children: [
            new docx.Paragraph({
              children: [
                new TextRun({
                  font:"Book Antiqua",
                  size:20,
                  bold:true,
                  text: String("Level 0"+data.academicPerformanceDetails[i].level),
                }),
              ]
            })
          ],
          columnSpan: 4,
        })],
      });
      rows.push(rowLevel);
      for (let j = 0; j < courseDetails.length; j++) {
        let rowCourse = new docx.TableRow({
          children: [
            new docx.TableCell({
              verticalAlign: docx.VerticalAlign.CENTER,
            children: [
              new docx.Paragraph({
                alignment: docx.AlignmentType.CENTER,
                children: [
                  new TextRun({
                    font:"Book Antiqua",
                    size:20,
                    text: String(courseDetails[j].courseCode),
                  }),
                ]
              })

            ],
          }),
          new docx.TableCell({
            children: [
              new docx.Paragraph({
                children: [
                  new TextRun({
                    font:"Book Antiqua",
                    size:20,
                    text: String(courseDetails[j].courseTitle),
                  }),
                ]
              })

            ],
          }),
          new docx.TableCell({
            verticalAlign: docx.VerticalAlign.CENTER,
            children: [
              new docx.Paragraph({
                alignment: docx.AlignmentType.CENTER,
                children: [
                  new TextRun({
                    font:"Book Antiqua",
                    size:20,
                    text: String(courseDetails[j].courseCredit)
                  }),
                ]
              })

            ],
          }),
          new docx.TableCell({
            verticalAlign: docx.VerticalAlign.CENTER,
            children: [
              new docx.Paragraph({
                alignment: docx.AlignmentType.CENTER,
                children: [
                  new TextRun({
                    font:"Book Antiqua",
                    size:20,
                    text: String(courseDetails[j].gradeDescription),
                  }),
                ]
              })

            ],
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
      type: docx.WidthType.AUTO,
    },
    borders:{
      top: { style: docx.BorderStyle.NONE },
      bottom: { style: docx.BorderStyle.NONE },
      left: { style: docx.BorderStyle.NONE },
      right: { style: docx.BorderStyle.NONE },
      insideHorizontal:{ style: docx.BorderStyle.NONE },
      insideVertical:{ style: docx.BorderStyle.NONE },
    },
    margins:{top:100},
    rows: [
        new TableRow({
          height: {
            value: 10, // Adjust the value as needed
            rule: docx.HeightRule.ATLEAST,
          },
            children: [
                new TableCell({

                    children: [
                     new Paragraph({
                        children: [
                          new TextRun({
                            font:"Book Antiqua",
                            size:22,
                            text: "Student Name:",
                          }),
                        ]
                      })
                      ],
                }),
                new TableCell({
                  columnSpan:3,
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            font:"Book Antiqua",
                            size:22,
                            text:data.personalDetails.titleText+'.',
                          }),
                          new TextRun({
                            text:this.camelCaseText(data.personalDetails.denotedByInitials)+' ',
                            font:"Book Antiqua",
                            size:22,
                            //italics:true
                          }),
                          new TextRun({
                            text:this.camelCaseText(data.personalDetails.lastName),
                            font:"Book Antiqua",
                            size:22,
                            //italics:true
                          }),
                          // new TextRun({
                          //   font:"Book Antiqua",
                          //   size:22,
                          //   text:this.camelCaseText(' '+data.personalDetails.lastName),
                          //   //italics:true
                          // }),
                          // new TextRun({
                          //   font:"Book Antiqua",
                          //   size:22,
                          //   text:' '+data.personalDetails.initials,
                          //   //italics:true
                          // })

                        ]
                      })
                      ],
                }),
            ],
        }),
        new TableRow({
          height: {
            value: 10, // Adjust the value as needed
            rule: docx.HeightRule.ATLEAST,
          },
            children: [
                new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            font:"Book Antiqua",
                            size:22,
                            text: "Student Registration No.:",
                          }),
                        ]
                      })],
                }),
                new TableCell({
                  columnSpan:3,
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            font:"Book Antiqua",
                            size:22,
                            text: data.personalDetails.registrationNumber!,
                          }),
                        ]
                      })],
                }),
            ],
        }),
        new TableRow({
          height: {
            value: 2, // Adjust the value as needed
            rule: docx.HeightRule.AUTO,
          },
          children: [
              new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          font:"Book Antiqua",
                          size:22,
                          text: "Medium:",
                        }),
                      ]
                    })],
              }),
              new TableCell({
                columnSpan:3,
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          font:"Book Antiqua",
                          size:22,
                          text: data.personalDetails.mediumText!,
                        }),
                      ]
                    })],
              }),
          ],
      }),
      new TableRow({
        children: [
            new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        font:"Book Antiqua",
                        size:22,
                        text: "Grade Point Average (GPA):",
                      }),
                    ]
                  })],
            }),
            new TableCell({
              columnSpan:3,
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        font:"Book Antiqua",
                        size:22,
                        text: "",
                      }),
                    ]
                  })
               ],
            }),
        ],
    }),
    new TableRow({
      children: [
          new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      font:"Book Antiqua",
                      size:22,
                      text: "Effective Date:",
                    }),
                  ]
                })],
          }),
          new TableCell({
            columnSpan:3,
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      font:"Book Antiqua",
                      size:22,
                      text: "",
                    }),
                  ]
                })
             ],
          }),
      ],
  }),new TableRow({
    children: [
        new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    font:"Book Antiqua",
                    size:22,
                    text: "Final Award:",
                  }),
                ]
              })],
        }),
        new TableCell({
          columnSpan:3,
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    font:"Book Antiqua",
                    size:22,
                    text: "",
                  }),
                ]
              })
           ],
        }),
    ],
}),
    //   new TableRow({
    //     children: [
    //         new TableCell({
    //             children: [
    //               new Paragraph({
    //                 children: [
    //                   new TextRun({
    //                     font:"Book Antiqua",
    //                     size:22,
    //                     text: "Field of Specialisation/ Discipline:",
    //                   }),
    //                 ]
    //               })],
    //         }),
    //         new TableCell({
    //           columnSpan:3,
    //             children: [
    //               new Paragraph({
    //                 children: [
    //                   new TextRun({
    //                     font:"Book Antiqua",
    //                     size:22,
    //                     text: data.personalDetails.specialization_description!,
    //                   }),
    //                 ]
    //               })
    //            ],
    //         }),
    //     ],
    // }),

    ],
});



if (this.coursejsonContinuData.length === 0) {
  this.additionalRequirementsHeading="";
  this.additionalRequirementsTable="";
} else {
  this.additionalRequirementsHeading=this.createSubHeadingSecond("Additional Requirements for the Award:");
  this.additionalRequirementsTable=this.generateEnglishTable(this.coursejsonContinuData);
}

if (gg.gpaDetailsjsonDataEnglish.length === 0) {
  this.additionalRequirementsGPATableHeading="";
  this.additionalRequirementsGPATable="";
} else {
  this.additionalRequirementsGPATableHeading=this.createSubHeadingSecond("Key to "+gg.coursejsonDataEnglish[0].courseCode);
  this.additionalRequirementsGPATable=this.generateEnglishGPATable(gg.gpaDetailsjsonDataEnglish);
}

//const bbbbb=this.generateEnglishGPATable(gg.gpaDetailsjsonDataEnglish);



const TOTAL_PAGES =PageNumber.TOTAL_PAGES;
const CURRENT_PAGE = PageNumber.CURRENT;

const currentDate = new Date();
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const dateString = `${year}-${month}-${day}`;
//const dateString = currentDate.toLocaleDateString();
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
            margin: {
              right: 1000,
              bottom: 0,
              left: 1000,
          },
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
                      indent: {
                        left: -400,
                    },
                        children: [
                          new ImageRun({
                            data: this.commonData.mainheader3,
                            transformation: {
                                width: 717,
                                height: 204.33,
                            },

                        }),
                        ],
                    }),
                ],
            }),
            // default: new Header({
            //     children: [
            //         new Paragraph({
            //             children: [
            //               new ImageRun({
            //                 data: this.commonData.secondHeader,
            //                 transformation: {
            //                     width: 600,
            //                     height: 50,
            //                 },
            //             }),
            //             ],
            //         }),
            //     ],
            // }),
        },
        footers: {
            first: new Footer({
                children: [
                  new Paragraph({
                    children: [

                      new ImageRun({
                        data: this.commonData.footer2,
                        transformation: {
                            width: 620,
                            height: 33,
                        },
                    }),
                      new Tab(),
                      new TextRun({
                        children: ["Page", PageNumber.CURRENT,"/",PageNumber.TOTAL_PAGES],
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

                      new ImageRun({
                        data: this.commonData.footer2,
                        transformation: {
                            width: 620,
                            height: 33,
                        },
                    }),
                      new Tab(),
                      new TextRun({
                        children: ["Page", PageNumber.CURRENT,"/",PageNumber.TOTAL_PAGES],
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
                    text:"Email : sarexam@ou.ac.lk",
                    font:"Book Antiqua",
                    size:20,
                }),
            ],
        }),
          new Paragraph({
            spacing: {
              before: 250,
          },
            children: [
                new TextRun({
                    text:"Date : "+dateString,
                    font:"Book Antiqua",
                    size:20,
                    //italics:true
                }),
            ],
        }),

          this.createHeading("To Whom It May Concern:"),

          //Show Qualification Details
          this.createSubHeading(data.personalDetails.programmeTitle),
          personalDetails,

          new Paragraph({
            alignment: docx.AlignmentType.JUSTIFIED,
            spacing: {
              before: 250,
          },
            children: [
                new TextRun({
                    text:"This is to certify that ",
                    font:"Book Antiqua",
                    size:22,
                  }),
                  new TextRun({
                    text:this.camelCaseText(data.personalDetails.denotedByInitials)+' ',
                    font:"Book Antiqua",
                    size:22,
                    //italics:true
                  }),
                  new TextRun({
                    text:this.camelCaseText(data.personalDetails.lastName),
                    font:"Book Antiqua",
                    size:22,
                    //italics:true
                  }),
                  new TextRun({
                    text:" has obtained the following grades or exemptions in the under mentioned courses of the ",
                    font:"Book Antiqua",
                    size:22,
                  }),
                  new TextRun({
                    text:this.camelCaseText(data.personalDetails.programmeTitle),
                    font:"Book Antiqua",
                    size:22,
                    //italics:true
                  }),
                  new TextRun({
                    font:"Book Antiqua",
                    size:22,
                    text:", conducted by The Open University of Sri Lanka.",

                  }),
            ],
        }),

      //   new Paragraph({
      //     spacing: {
      //       before: 250,
      //   },
      //     children: [
      //         new TextRun({
      //           font:"Book Antiqua",
      //           size:22,
      //             text:"Please note that the student has Yet to complete all the academic requirements for the award of the ",
      //         }),
      //         new TextRun({
      //           text:"data.personalDetails.qualifications",
      //           font:"Book Antiqua",
      //           size:22,
      //         }),
      //         new TextRun({
      //           text: "as at "+dateString,
      //           font:"Book Antiqua",
      //           size:22,
      //         }),
      //     ],
      // }),


         //Show Academic Performance Details:
         this.createSubHeadingSecond("Academic Performance Details"),
         academicPerformanceDetails,




   //Show Key to Grades/Status and Grade Point Values:
   //this.createSubHeading("Key to Grades/Status, Grade Point Values and Mark Ranges:"),
  // gpa,
   this.createSubHeadingSecond("Key to Grades/Status, Grade Point Values and Mark Ranges:(Up to the Ac.year 2020/2021)"),
   this.generateGPATable(gg),
   new Paragraph({
    children: [
        new TextRun({
            text: "Grades A+ to C are the pass grades.",
            italics:true,
            bold:true,
            font:"Book Antiqua",
            size:20,
        }),
    ],
}),

   this.createSubHeadingSecond("Key to Grades/Status, Grade Point Values and Mark Ranges:(with effect from Ac.year 2021/2022)"),
   this.generateGPATable2(gg),
   new Paragraph({
    children: [
        new TextRun({
            text: "Grades A+ to C are the pass grades.",
            italics:true,
            bold:true,
            font:"Book Antiqua",
            size:20,
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
      text:"30 Credits at Levels 03 & 04 of this programme have been exempted based on the Degree in ",
      font:"Book Antiqua",
      size:22,
    }),
    new TextRun({
      text:this.camelCaseText(data.personalDetails.programmeTitle),
      font:"Book Antiqua",
      size:22,
      //italics:true
    }),
    new TextRun({
      text:" offered by the Ministry of Health, Sri Lanka",
      font:"Book Antiqua",
      size:22
    }),
  ]
}),

   //this.createSubHeadingSecond("Additional Requirements for the Award:"),
   //this.generateEnglishTable(gg.coursejsonDataEnglish),
   //this.createSubHeadingSecond("Key to "+gg.coursejsonDataEnglish[0].courseCode),
   //this.bbbbb,
   //this.generateEnglishGPATable(gg.gpaDetailsjsonDataEnglish),
   //gpaDetails1,
  //gg,
  this.additionalRequirementsHeading,
  this.additionalRequirementsTable,
  this.additionalRequirementsGPATableHeading,
  this.additionalRequirementsGPATable,
  new Paragraph({
    spacing:{
      before:50,
      after:50
    },
    tabStops: [
      {
        type: TabStopType.RIGHT,
        position: TabStopPosition.MAX
      }
    ],
    children: [
      new TextRun({
        text: "",
      })
    ]
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
                children: [
                  new Paragraph({
                    children: [
                        new TextRun({
                            text: "EX",
                            font:"Book Antiqua",
                            size:20,
                        }),
                    ],
                }),
                ],
            }),
            new TableCell({
              width: {
                size: 50,
                type: WidthType.AUTO,
            },
              children: [
                new Paragraph({
                  children: [
                      new TextRun({
                          text: "- Exemption has been granted after evaluation of previous qualifications obtained by the student.",
                          font:"Book Antiqua",
                          size:20,
                      }),
                  ],
              }),
             ],
          }),
        ],
    }),
  ],
}),
//this is RX andEX //
// new Table({
//   borders:{
//     top: { style: docx.BorderStyle.NONE },
//     bottom: { style: docx.BorderStyle.NONE },
//     left: { style: docx.BorderStyle.NONE },
//     right: { style: docx.BorderStyle.NONE },
//     insideHorizontal:{ style: docx.BorderStyle.NONE },
//     insideVertical:{ style: docx.BorderStyle.NONE },
//   },
//   width: {
//     size: 100,
//     type: docx.WidthType.PERCENTAGE,
//   },
//   rows: [
//       new TableRow({
//           children: [
//               new TableCell({
//                 width: {
//                   size: 50,
//                   type: WidthType.AUTO,
//               },
//                   children: [
//                     new Paragraph({
//                       children: [
//                           new TextRun({
//                               text: "RX",
//                               font:"Book Antiqua",
//                               size:20,
//                           }),
//                       ],
//                   }),
//                   ],
//               }),
//               new TableCell({
//                 width: {
//                   size: 50,
//                   type: WidthType.AUTO,
//               },
//                 children: [
//                   new Paragraph({
//                     children: [
//                         new TextRun({
//                             text: "- Student has passed the Continuous Assessment,but absent for the Final Examination,hence required to sit the Final Examination.",
//                             font:"Book Antiqua",
//                             size:20,
//                         }),
//                     ],
//                 })],
//             }),
//           ],
//       }),
//       new TableRow({
//         children: [
//             new TableCell({
//               width: {
//                 size: 50,
//                 type: WidthType.AUTO,
//             },
//                 children: [
//                   new Paragraph({
//                     children: [
//                         new TextRun({
//                             text: "EX",
//                             font:"Book Antiqua",
//                             size:20,
//                         }),
//                     ],
//                 }),
//                 ],
//             }),
//             new TableCell({
//               width: {
//                 size: 50,
//                 type: WidthType.AUTO,
//             },
//               children: [
//                 new Paragraph({
//                   children: [
//                       new TextRun({
//                           text: "- Exemption has been granted after evaluation of previous qualifications obtained by the student.",
//                           font:"Book Antiqua",
//                           size:20,
//                       }),
//                   ],
//               }),
//              ],
//           }),
//         ],
//     }),
//   ],
// }),

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
              font:"Book Antiqua",
              size:22,
              text: "This letter is issued at the request of "+this.camelCaseText(data.personalDetails.titleText)+'.'+""
            }),
            new TextRun({
              font:"Book Antiqua",
              size:22,
              text: " "+data.personalDetails.initials+"",
              //italics:true
            }),
            new TextRun({
              font:"Book Antiqua",
              size:22,
              text: " "+ this.camelCaseText(data.personalDetails.lastName)+".",
              //italics:true
            })
          ]
        }),
        new Paragraph({
          children: [
              new TextRun({
                  text: "Assistant Registrar",
                  bold:true,
                  font:"Book Antiqua",
                  size:22,
              })
          ],
      }),
      new Paragraph({
        children: [
            new TextRun({
              text: "Examinations Division",
              bold:true,
              font:"Book Antiqua",
              size:22,
          })
        ],
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "For Registrar",
          bold:true,
          font:"Book Antiqua",
          size:22,
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
    children: [
      new TextRun({
        font:"Book Antiqua",
        text: text,
        bold: true,
        size:24
      }),

    ],
    heading: HeadingLevel.HEADING_2,
  });
}

public createSubHeading(text: string): Paragraph {
  return new Paragraph({
    alignment: docx.AlignmentType.JUSTIFIED,
    spacing:{
      before:300,
      after:300
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
        font:"Book Antiqua",
        size:24,
        allCaps: true,
        text: "RESULTS OF THE "+text,
        bold: true
      }),

    ]
  });
}

public createSubHeadingSecond(text: string): Paragraph {
  return new Paragraph({
    spacing:{
      before:300,
    },
    tabStops: [
      {
        type: TabStopType.RIGHT,
        position: TabStopPosition.MAX
      }
    ],
    children: [
      new TextRun({
        font:"Book Antiqua",
        size:22,
        text: text,
        bold: true
      }),

    ]
  });
}



generateGPATable(data: any) {
  const rows = [];

  for (let i = 0; i < data.data.length; i++) {
    const item = data.data[i].value;
    const cells = [];
for (let p = 0; p < item.length; p++) {
const cell =new docx.TableCell({
  verticalAlign: docx.VerticalAlign.CENTER,
  width: {
    size: 700,
    type: WidthType.DXA,
},
  children: [
    new docx.Paragraph({
      alignment: docx.AlignmentType.CENTER,
      children: [
        new TextRun({
          font:"Book Antiqua",
          size:18,
          text: item[p],
        }),
      ]
    })

  ]
})
cells.push(cell);
}
    const row = new docx.TableRow({
      children: cells
    });

    rows.push(row);
  }

  const table = new docx.Table({
    rows
  });

  return table;
}


generateGPATable2(data: any) {
  const rows = [];

  for (let i = 0; i < data.data2.length; i++) {
    const item = data.data2[i].value;
    const cells = [];
for (let p = 0; p < item.length; p++) {
const cell =new docx.TableCell({
  verticalAlign: docx.VerticalAlign.CENTER,
  width: {
    size: 700,
    type: WidthType.DXA,
},
  children: [
    new docx.Paragraph({
      alignment: docx.AlignmentType.CENTER,
      children: [
        new TextRun({
          font:"Book Antiqua",
          size:18,
          text: item[p],
        }),
      ]
    })

  ]
})
cells.push(cell);
}
    const row = new docx.TableRow({
      children: cells
    });

    rows.push(row);
  }

  const table = new docx.Table({
    rows
  });

  return table;
}


generateEnglishGPATable(data: any) {
  const rows = [];

  for (let i = 0; i < data.length; i++) {
    const item = data[i].value;
    const cells = [];
for (let p = 0; p < item.length; p++) {
const cell =new docx.TableCell({
  verticalAlign: docx.VerticalAlign.CENTER,
  width: {
    size: 700,
    type: WidthType.DXA,
},
  children: [
    new docx.Paragraph({
      alignment: docx.AlignmentType.CENTER,
      children: [
        new TextRun({
          font:"Book Antiqua",
          size:18,
          text: item[p],
        }),
      ]
    })
  ]
})
cells.push(cell);
}
    const row = new docx.TableRow({
      children: cells
    });

    rows.push(row);
  }

  const table = new docx.Table({
    rows
  });

  return table;
}

 camelCaseText(word:string): string {
  const words = word.split(' ');

  const camelCaseWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  return camelCaseWords.join(' ');
}



generateEnglishTable(data: any) {
  const rows = [];

  const rows1 = new TableRow({
    children: [
        new TableCell({
            width: {
                size: 800,
                type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    font:"Book Antiqua",
                    size:20,
                    bold:true,
                    text: "Course Code",
                  }),
                ]
              })
            ],
        }),
        new TableCell({
            width: {
                size: 2500,
                type: WidthType.PERCENTAGE,
            },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    font:"Book Antiqua",
                    size:20,
                    bold:true,
                    text: "Course Title",
                  }),
                ]
              })
            ],
        }),
        new TableCell({
          width: {
              size: 800,
              type: WidthType.PERCENTAGE,
          },
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  font:"Book Antiqua",
                  size:20,
                  bold:true,
                  text: "Credit Rating",
                }),
              ]
            })
          ],
      }),
      new TableCell({
        width: {
            size: 2500,
            type: WidthType.PERCENTAGE,
        },
        children: [
          new Paragraph({
            children: [
              new TextRun({
                font:"Book Antiqua",
                size:20,
                bold:true,
                text: "Grade",
              }),
            ]
          })
        ],
    }),
    ],
});

rows.push(rows1);

for (let j = 0; j < data.length; j++) {
  let rowCourse = new docx.TableRow({
    children: [
      new docx.TableCell({
        verticalAlign: docx.VerticalAlign.CENTER,
      children: [
        new docx.Paragraph({
          children: [
            new TextRun({
              font:"Book Antiqua",
              size:20,
              text: String(data[j].courseCode),
            }),
          ]
        })
      ],
    }),
    new docx.TableCell({

      children: [
        new docx.Paragraph({
          children: [
            new TextRun({
              font:"Book Antiqua",
              size:20,
              text: String(data[j].title),
            }),
          ]
        })
      ],
    }),
    new docx.TableCell({
      verticalAlign: docx.VerticalAlign.CENTER,
      children: [
        new docx.Paragraph({
          alignment: docx.AlignmentType.CENTER,
          children: [
            new TextRun({
              font:"Book Antiqua",
              size:20,
              text: String(data[j].creadit),
            }),
          ]
        })

      ],
    }),
    new docx.TableCell({
      verticalAlign: docx.VerticalAlign.CENTER,
      children: [
        new docx.Paragraph({
          alignment: docx.AlignmentType.CENTER,
          children: [
            new TextRun({
              font:"Book Antiqua",
              size:20,
              text: String(data[j].grade),
            }),
          ]
        })
      ],
    })


  ],
  });
  rows.push(rowCourse);
}

  const table = new docx.Table({
    rows
  });

  return table;
}
}
