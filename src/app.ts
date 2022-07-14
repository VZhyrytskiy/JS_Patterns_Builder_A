import { createUrlFilter} from './problem';
import { EventFilterBuilder } from './step1';
import { EventFilterBuilder as EventFilterBuilderNext } from './step2';
import { EventFilterBuilder as EventFilterBuilderImproved } from './step3';

const orderFilter = {
    category: 'electronic',
    status: ['apporved', 'paid'],
    openOnly: true
};

// problem
{
    const filterResult = createUrlFilter(orderFilter);
    console.log(filterResult);
}

// first step
{
    const filterResult = new EventFilterBuilder()
        .setCategoryFilter(orderFilter.category)
        .setStatusFilter(orderFilter.status)
        .setOpenOnlyFilter(true)
        .build();
    console.log(filterResult);


    // problem with mutation of filterResult
    const openOnlyBuilder = new EventFilterBuilder().setOpenOnlyFilter(true);
    const statusBuilder = openOnlyBuilder.setStatusFilter(orderFilter.status);
    console.log('openOnlyBuilder result:', openOnlyBuilder.build()); // (status = 'apporved' or status = 'paid') and (deleted = 0)
    console.log('statusBuilder result:', statusBuilder.build()); //  (status = 'apporved' or status = 'paid') and (deleted = 0)
}

// second step
{
    const filterResult = new EventFilterBuilderNext()
        .setCategoryFilter(orderFilter.category)
        .setStatusFilter(orderFilter.status)
        .setOpenOnlyFilter(true)
        .build();
    console.log(filterResult);


    // No problem with mutation of filterResult
    const openOnlyBuilder = new EventFilterBuilderNext().setOpenOnlyFilter(true);
    const statusBuilder = openOnlyBuilder.setStatusFilter(orderFilter.status);
    console.log('openOnlyBuilder result:', openOnlyBuilder.build()); // (deleted = 0)
    console.log('statusBuilder result:', statusBuilder.build()); //  (status = 'apporved' or status = 'paid') and (deleted = 0)
}

// final step
{
    const filterResult = new EventFilterBuilderImproved()
        .setCategoryFilter(orderFilter.category)
        .setStatusFilter(orderFilter.status)
        .setOpenOnlyFilter(true)
        .build();
    console.log(filterResult);


    const openOnlyBuilder = new EventFilterBuilderImproved().setOpenOnlyFilter(true);
    const statusBuilder = openOnlyBuilder.setStatusFilter(orderFilter.status);
    console.log('openOnlyBuilder result:', openOnlyBuilder.build()); // (status = 'apporved' or status = 'paid') and (deleted = 0)
    console.log('statusBuilder result:', statusBuilder.build()); //  (status = 'apporved' or status = 'paid') and (deleted = 0)
}

// Статья
// https://betterprogramming.pub/apply-builder-pattern-to-generate-query-filter-in-typescript-651a6b13da38