import React from 'react'

const NewsItem = ({ title, description, url, urlToImage}) => {

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-2 ">
      <img className="w-full" src={urlToImage} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">
          {description}
        </p>
      </div>
      <div className="px-6 py-4">
        <a href={url} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          Read more
        </a>
      </div>
    </div>
  )

}

export default NewsItem