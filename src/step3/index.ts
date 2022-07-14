export type FilterType = {
    category: string;
    status: string | string[];
    openOnly: boolean;
};

export class EventFilterBuilder<T extends FilterType> {
    private filterResult: Record<keyof T, string> | undefined;
    
    constructor(current?: Record<keyof T, string>) {
        this.filterResult = current;
    }

    setCategoryFilter(category: string) {
        return new EventFilterBuilder(
            EventFilterBuilder.#mergeObjects(
                this.filterResult, 
                { category: category ? `(category = '${category}')` : undefined }
            )
        );
    }

    setOpenOnlyFilter(openOnly: boolean) {
        return new EventFilterBuilder(
            EventFilterBuilder.#mergeObjects(
                this.filterResult, 
                { openOnly: openOnly ? `(deleted eq 0)` : undefined }
            )
        );
    }

    setStatusFilter(status: string | string[]) {
        const statusList = Array.isArray(status) ? status : [status];
        
        return new EventFilterBuilder(
            EventFilterBuilder.#mergeObjects(
                this.filterResult, 
                { status: status ? `(${this.buildFilterFromArray(statusList, 'status')})` : undefined }
            )
        );
    }

    build() {
        const filters = Object.values(this.filterResult!).filter(Boolean);
        return filters?.length > 0 ? filters.join(` and `) : '';
    }

    private buildFilterFromArray(values: string[], prop: keyof T) {
        return values?.map(e => `${String(prop)} = '${e}'`).join(` or `) ?? '';
    }

    static #mergeObjects<TObject, TKey extends keyof TObject>(
        originalObject: TObject,
        changes: Pick<TObject, TKey>
    ): TObject {
        return Object.assign({}, originalObject, changes);
    } 
}
