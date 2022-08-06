export function paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;
    console.log(
        "items",
        items.length,
        "page number",
        pageNumber,
        "page size",
        pageSize,
        "start index",
        startIndex
    );

    return [...items].splice(startIndex, pageSize);
}
