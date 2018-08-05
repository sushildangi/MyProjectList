package org.pyarts.myprojectlist.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import org.pyarts.myprojectlist.domain.enumeration.Language;

/**
 * A Project.
 */
@Entity
@Table(name = "project")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Project implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 5)
    @Column(name = "project_title", nullable = false)
    private String projectTitle;

    
    @Lob
    @Column(name = "description", nullable = false)
    private String description;

    
    @Lob
    @Column(name = "image", nullable = false)
    private byte[] image;

    @Column(name = "image_content_type", nullable = false)
    private String imageContentType;

    @NotNull
    @Column(name = "published_date", nullable = false)
    private LocalDate publishedDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "project_language")
    private Language projectLanguage;

    @NotNull
    @Column(name = "is_published", nullable = false)
    private Boolean isPublished;

    @OneToOne
    @JoinColumn(unique = true)
    private User title;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProjectTitle() {
        return projectTitle;
    }

    public Project projectTitle(String projectTitle) {
        this.projectTitle = projectTitle;
        return this;
    }

    public void setProjectTitle(String projectTitle) {
        this.projectTitle = projectTitle;
    }

    public String getDescription() {
        return description;
    }

    public Project description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getImage() {
        return image;
    }

    public Project image(byte[] image) {
        this.image = image;
        return this;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public Project imageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public LocalDate getPublishedDate() {
        return publishedDate;
    }

    public Project publishedDate(LocalDate publishedDate) {
        this.publishedDate = publishedDate;
        return this;
    }

    public void setPublishedDate(LocalDate publishedDate) {
        this.publishedDate = publishedDate;
    }

    public Language getProjectLanguage() {
        return projectLanguage;
    }

    public Project projectLanguage(Language projectLanguage) {
        this.projectLanguage = projectLanguage;
        return this;
    }

    public void setProjectLanguage(Language projectLanguage) {
        this.projectLanguage = projectLanguage;
    }

    public Boolean isIsPublished() {
        return isPublished;
    }

    public Project isPublished(Boolean isPublished) {
        this.isPublished = isPublished;
        return this;
    }

    public void setIsPublished(Boolean isPublished) {
        this.isPublished = isPublished;
    }

    public User getTitle() {
        return title;
    }

    public Project title(User user) {
        this.title = user;
        return this;
    }

    public void setTitle(User user) {
        this.title = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Project project = (Project) o;
        if (project.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), project.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Project{" +
            "id=" + getId() +
            ", projectTitle='" + getProjectTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", image='" + getImage() + "'" +
            ", imageContentType='" + getImageContentType() + "'" +
            ", publishedDate='" + getPublishedDate() + "'" +
            ", projectLanguage='" + getProjectLanguage() + "'" +
            ", isPublished='" + isIsPublished() + "'" +
            "}";
    }
}
