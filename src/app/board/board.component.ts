import { Component, OnInit } from "@angular/core";
import { StatusesService, Status } from "./statuses.service";
import { Observable } from "rxjs/internal/Observable";
import { ActivatedRoute, Params } from "@angular/router";
import { Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.scss"],
  providers: [StatusesService]
})
export class BoardComponent implements OnInit {
  boardStatuses$: Observable<Status[]>;
  boardId: string;
  addingStatusState: false;

  newStatusForm = this.fb.group({
    name: [null, Validators.required]
  });

  constructor(
    private statusesService: StatusesService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.boardId = params["boardId"];

      this.statusesService.getStatusesOfBoard(this.boardId);

      this.boardStatuses$ = this.statusesService.boardStatuses$;
    });
  }

  onStatusAdd() {
    if (!this.newStatusForm.valid) return;

    const { name } = this.newStatusForm.value;
    this.statusesService.addStatus(name);

    this.addingStatusState = false;
    this.newStatusForm.value.name = null;
  }
}
