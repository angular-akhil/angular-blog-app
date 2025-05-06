import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  blog: any = null;
  comments: any[] = [];
  isLoading: boolean = true;
  hasError: boolean = false;

  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);

  ngOnInit(): void {
    const blogId = Number(this.route.snapshot.paramMap.get('id')); // Convert ID to number
    console.log('Fetched Blog ID:', blogId);

    if (blogId) {
      // Fetch blogs and comments
      this.blogService.getBlogs().subscribe({
        next: (blogs) => {
          console.log('Fetched Blogs:', blogs);

          if (Array.isArray(blogs)) {
            this.blog = blogs.find((b: any) => Number(b.id) === blogId);
            console.log('Matched Blog:', this.blog);

            if (!this.blog) {
              console.error(`Blog with ID ${blogId} not found.`);
              this.hasError = true;
            }
          } else {
            console.error('Unexpected response structure:', blogs);
            this.hasError = true;
          }

          this.isLoading = false;
        },
        error: (e) => {
          console.error('Error fetching blogs:', e);
          this.hasError = true;
          this.isLoading = false;
        },
      });

      this.blogService.getComments(blogId).subscribe({
        next: (data) => {
          console.log('Fetched Comments:', data);
          this.comments = data;
        },
        error: (e) => console.error('Error fetching comments:', e),
      });
    } else {
      console.error('Invalid blogId');
      this.hasError = true;
      this.isLoading = false;
    }
  }
}
