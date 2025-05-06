import { Component, inject, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
})
export class BlogComponent implements OnInit {
  blogs: any[] = [];

  private blogService = inject(BlogService);
  private router = inject(Router);

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe((data) => {
      this.blogs = data;
    });
  }

  selectBlog(blogId: number): void {
    this.router
      .navigate([`/blog/${blogId}`])
      .catch((err) => console.error(err)); // Navigate to blog details page with the blogId
  }
}
