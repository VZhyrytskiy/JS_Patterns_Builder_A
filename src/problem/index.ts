export function createUrlFilter(orderFilter: any) {

    let urlFilter = '';

    if (orderFilter.category) {
        urlFilter += `(category = '${orderFilter.category}')`;
    }

    if (Array.isArray(orderFilter.status) && orderFilter.status?.length > 0) {
        urlFilter += urlFilter ? ' and ' : '';
        urlFilter += `(${orderFilter.status.map(x => `status = '${x}'`).join(' or ')})`;
    } else if (orderFilter.status) {
        urlFilter += urlFilter ? ' and ' : '';
        urlFilter += `status = '${orderFilter.status}'`;
    }

    if (orderFilter.openOnly) {
        urlFilter += urlFilter ? ' and ' : '';
        urlFilter += `(deleted = 0)`;
    }

    return urlFilter;
}
// Problems:
// 1. Multiple if statements make it difficult to read.
// 2. It can quickly become unmanageable when more filter conditions are added
// 3. The similar code blocks are repeated in many different places. (We need to use different but similar filters in various API calls).
