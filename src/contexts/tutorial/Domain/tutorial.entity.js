export class Tutorial {
  constructor({
    id = '',
    title = '',
    category = '',
    difficulty = '',
    description = '',
    duration = 0,
    authorId = '',
    content = '',
    tags = [],
    imageUrl = '',
    videoUrl = '',
    isPublished = false,
    rating = null,
    enrollments = 0,
    createdAt = '',
    updatedAt = '',
  }) {
    this.id = id
    this.title = title
    this.category = category
    this.difficulty = difficulty
    this.description = description
    this.duration = duration
    this.authorId = authorId
    this.content = content
    this.tags = tags
    this.imageUrl = imageUrl
    this.videoUrl = videoUrl
    this.isPublished = isPublished
    this.rating = rating
    this.enrollments = enrollments
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
