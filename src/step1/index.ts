export class EventFilterBuilder {
    private filterResult: { [key: string]: string } = {};

    setCategoryFilter(category: string): this {
        if (category) {
            this.filterResult.categoryFilter = `(category = '${category}')`;
        }
        return this;
    }

    setOpenOnlyFilter(openOnly: boolean): this {
        if (openOnly) {
            this.filterResult.openOnlyFilter = `(deleted = 0)`;
        }
        return this;
    }

    setStatusFilter(status: string | string[]): this {
        const statusList = Array.isArray(status) ? status : [status];

        this.filterResult.statusFilter = `(${this.buildFilterFromArray(
            statusList,
            'status'
        )})`;
        return this;
    }

    build(): string {
        const filters = Object.values(this.filterResult).filter(Boolean);
        return filters?.length > 0 ? filters.join(` and `) : '';
    }

    private buildFilterFromArray(values: string[], prop: string) {
        return values?.map(e => `${prop} = '${e}'`).join(` or `) ?? '';
    }
}