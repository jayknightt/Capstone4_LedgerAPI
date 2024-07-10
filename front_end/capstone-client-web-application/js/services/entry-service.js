let entryService

class EntryService {
	filter = {
		description: undefined,
		vendor: undefined,
		minAmount: undefined,
		maxAmount: undefined,
		queryString: () => {
			let qs = ''
			if (this.filter.description) {
				const desc = `description=${this.filter.description}`
				if (qs.length > 0) {
					qs += `&${desc}`
				} else {
					qs = desc
				}
			}
			if (this.filter.vendor) {
				const vend = `vendor=${this.filter.vendor}`
				if (qs.length > 0) {
					qs += `&${vend}`
				} else {
					qs = vend
				}
			}
			if (this.filter.minAmount) {
				const minA = `minAmount=${this.filter.minAmount}`
				if (qs.length > 0) {
					qs += `&${minA}`
				} else {
					qs = minA
				}
			}
			if (this.filter.maxAmount) {
				const maxA = `maxAmount=${this.filter.maxAmount}`
				if (qs.length > 0) {
					qs += `&${maxA}`
				} else {
					qs = maxA
				}
			}
			// if (this.filter.filter) {
			// 	const fil = `color=${this.filter.filter}`
			// 	if (qs.length > 0) {
			// 		qs += `&${fil}`
			// 	} else {
			// 		qs = fil
			// 	}
			// }

			return qs.length > 0 ? `?${qs}` : ''
		},
	}

	addMinPriceFilter(price) {
		if (price == 0 || price == '') this.clearMinAmountFilter()
		else this.filter.minAmount = price
	}
	addMaxPriceFilter(price) {
		if (price == 0 || price == '') this.clearMaxAmountFilter()
		else this.filter.maxAmount = price
	}
	addFilter(filter) {
		if (filter == '') this.clearFilter()
		else this.filter.filter = filter
	}

	clearMinAmountFilter() {
		this.filter.minAmount = undefined
	}
	clearMaxAmountFilter() {
		this.filter.maxAmount = undefined
	}
	clearFilter() {
		this.filter.filter = undefined
	}

	search() {
		const url = `${config.baseUrl}/entries${this.filter.queryString()}`

		axios
			.get(url)
			.then(response => {
				let data = {}
				data.entries = response.data

				templateBuilder.build('entries', data, 'content')
			})
			.catch(error => {
				const data = {
					error: 'Searching entries failed.',
				}

				templateBuilder.append('error', data, 'errors')
			})
	}
}

document.addEventListener('DOMContentLoaded', () => {
	entryService = new EntryService()
})
