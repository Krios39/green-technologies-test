import {HttpService} from "./http.service";
import {Item} from "../models/item";

interface AddItemRequest {
    dateOfSend: string,
    forecastStart: string,
    forecastEnd: string
}

class ItemsServiceImpl {
    async get(): Promise<Item[]> {
        return await HttpService.get<Item[]>('findAllForecastPlanerItems').then(data => data)
    }

    async add(data: AddItemRequest): Promise<void> {
        const params = this.convertAddItemRequestToURLSearchParams(data)
        return await HttpService.get<void>('addNewForecastPlannerItem', params).then(data => data)
    }

    async delete(id: number): Promise<void> {
        return await HttpService.get<void>('deleteForecastPlannerItemById', new URLSearchParams({'itemId': id.toString()})).then(data => data)
    }

    private convertAddItemRequestToURLSearchParams(data: AddItemRequest) {
        const params = new URLSearchParams()
        params.append('dateOfSend', data.dateOfSend)
        params.append('forecastStart', data.forecastStart)
        params.append('forecastEnd', data.forecastEnd)
        return params
    }
}

export const ItemsService = new ItemsServiceImpl()