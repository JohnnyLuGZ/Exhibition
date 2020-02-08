export default class Pagination {
  constructor(endpoint) {
    this.endpoint = endpoint;

    this.resource = {
      data: [],
      links: {},
      meta: {}
    };
  }

  getResources(params) {
    axios
      .get(this.endpoint, { params })
      .then(response => (this.resource = response.data));
  }

  items() {
    return this.resource.data;
  }

  setItems(data) {
    this.resource.data = data
  }

  any() {
    return this.resource.data.length > 0;
  }

  prev() {
    if (!this.hasPrev()) return;
    this.getResources({ page: this.currentPage() - 1 });
  }

  next() {
    if (!this.hasNext()) return;
    this.getResources({ page: this.currentPage() + 1 });
  }

  hasPrev() {
    return this.resource.meta.current_page > 1;
  }

  hasNext() {
    return this.resource.meta.current_page < this.resource.meta.last_page;
  }

  pageInfo() {
    return this.currentPage() + "/" + this.resource.meta.last_page;
  }

  currentPage() {
    return this.resource.meta.current_page || 1;
  }

  total() {
    return this.resource.meta.total;
  }
}
