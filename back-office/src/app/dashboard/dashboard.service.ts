import { ModelDashboard } from "./model-dashboard"
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class DashboardService{
    modelDasbaord : ModelDashboard[] = [
        new ModelDashboard(
            200,
            'Goita',
            'Assimi',
            'Ma-Li-En',
            234
        ),
        new ModelDashboard(
            666,
            '??????',
            'Alastor',
            'HAZBIN',
            666
        )
    ]

    getdashboard(): ModelDashboard[]{
        return this.modelDasbaord;
    }
}