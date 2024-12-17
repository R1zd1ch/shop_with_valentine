const validateImageUrl = (url: string | undefined): string => {
	if (!url || typeof url !== 'string' || !/^https?:\/\//.test(url)) {
		return 'https://via.placeholder.com/500x400'
	}
	try {
		new URL(url)
		return url
	} catch {
		return 'https://via.placeholder.com/500x400'
	}
}

export default validateImageUrl
