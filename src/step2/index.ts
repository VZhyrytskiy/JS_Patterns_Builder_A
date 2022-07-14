export class EventFilterBuilder {
    private filterResult: { readonly [key: string]: string } = {};

    constructor(current = {}) {
        this.filterResult = current;
    }

    setCategoryFilter(category: string): EventFilterBuilder {
        return new EventFilterBuilder({
            ...this.filterResult,
            category: category ? `(category = '${category}')` : undefined,
        });
    }

    setOpenOnlyFilter(openOnly: boolean): EventFilterBuilder {
        return new EventFilterBuilder({
            ...this.filterResult,
            openOnlyFilter: openOnly ? `(deleted = 0)` : undefined,
        });
    }

    setStatusFilter(status: string | string[]): EventFilterBuilder {
        const statusList = Array.isArray(status) ? status : [status];

        return new EventFilterBuilder({
            ...this.filterResult,
            statusFilter: `(${this.buildFilterFromArray(
                statusList,
                'status'
            )})`
        });
    }

    build() {
        const filters = Object.values(this.filterResult).filter(Boolean);
        return filters?.length > 0 ? filters.join(` and `) : '';
    }

    private buildFilterFromArray(values: string[], prop: string) {
        return values?.map(e => `${prop} = '${e}'`).join(` or `) ?? undefined;
    }
}