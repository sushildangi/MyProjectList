import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './project.reducer';
import { IProject } from 'app/shared/model/project.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IProjectUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IProjectUpdateState {
  isNew: boolean;
  titleId: number;
}

export class ProjectUpdate extends React.Component<IProjectUpdateProps, IProjectUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      titleId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getUsers();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { projectEntity } = this.props;
      const entity = {
        ...projectEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/project');
  };

  titleUpdate = element => {
    const id = element.target.value.toString();
    if (id === '') {
      this.setState({
        titleId: -1
      });
    } else {
      for (const i in this.props.users) {
        if (id === this.props.users[i].id.toString()) {
          this.setState({
            titleId: this.props.users[i].id
          });
        }
      }
    }
  };

  render() {
    const { projectEntity, users, loading, updating } = this.props;
    const { isNew } = this.state;

    const { description, image, imageContentType } = projectEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="myProjectListApp.project.home.createOrEditLabel">
              <Translate contentKey="myProjectListApp.project.home.createOrEditLabel">Create or edit a Project</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : projectEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="project-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="projectTitleLabel" for="projectTitle">
                    <Translate contentKey="myProjectListApp.project.projectTitle">Project Title</Translate>
                  </Label>
                  <AvField
                    id="project-projectTitle"
                    type="text"
                    name="projectTitle"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      minLength: { value: 5, errorMessage: translate('entity.validation.minlength', { min: 5 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="description">
                    <Translate contentKey="myProjectListApp.project.description">Description</Translate>
                  </Label>
                  <AvInput
                    id="project-description"
                    type="textarea"
                    name="description"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="imageLabel" for="image">
                      <Translate contentKey="myProjectListApp.project.image">Image</Translate>
                    </Label>
                    <br />
                    {image ? (
                      <div>
                        <a onClick={openFile(imageContentType, image)}>
                          <img src={`data:${imageContentType};base64,${image}`} style={{ maxHeight: '100px' }} />
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {imageContentType}, {byteSize(image)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('image')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_image" type="file" onChange={this.onBlobChange(true, 'image')} accept="image/*" />
                    <AvInput
                      type="hidden"
                      name="image"
                      value={image}
                      validate={{
                        required: { value: true, errorMessage: translate('entity.validation.required') }
                      }}
                    />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label id="publishedDateLabel" for="publishedDate">
                    <Translate contentKey="myProjectListApp.project.publishedDate">Published Date</Translate>
                  </Label>
                  <AvField
                    id="project-publishedDate"
                    type="date"
                    className="form-control"
                    name="publishedDate"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="projectLanguageLabel">
                    <Translate contentKey="myProjectListApp.project.projectLanguage">Project Language</Translate>
                  </Label>
                  <AvInput
                    id="project-projectLanguage"
                    type="select"
                    className="form-control"
                    name="projectLanguage"
                    value={(!isNew && projectEntity.projectLanguage) || 'JAVA'}
                  >
                    <option value="JAVA">
                      <Translate contentKey="myProjectListApp.Language.JAVA" />
                    </option>
                    <option value="PYTHON">
                      <Translate contentKey="myProjectListApp.Language.PYTHON" />
                    </option>
                    <option value="CSHARP">
                      <Translate contentKey="myProjectListApp.Language.CSHARP" />
                    </option>
                    <option value="PHP">
                      <Translate contentKey="myProjectListApp.Language.PHP" />
                    </option>
                    <option value="OTHER">
                      <Translate contentKey="myProjectListApp.Language.OTHER" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="isPublishedLabel" check>
                    <AvInput id="project-isPublished" type="checkbox" className="form-control" name="isPublished" />
                    <Translate contentKey="myProjectListApp.project.isPublished">Is Published</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label for="title.id">
                    <Translate contentKey="myProjectListApp.project.title">Title</Translate>
                  </Label>
                  <AvInput id="project-title" type="select" className="form-control" name="title.id" onChange={this.titleUpdate}>
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/project" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />&nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  projectEntity: storeState.project.entity,
  loading: storeState.project.loading,
  updating: storeState.project.updating
});

const mapDispatchToProps = {
  getUsers,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectUpdate);
