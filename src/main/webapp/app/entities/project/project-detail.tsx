import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './project.reducer';
import { IProject } from 'app/shared/model/project.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProjectDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class ProjectDetail extends React.Component<IProjectDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { projectEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="myProjectListApp.project.detail.title">Project</Translate> [<b>{projectEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="projectTitle">
                <Translate contentKey="myProjectListApp.project.projectTitle">Project Title</Translate>
              </span>
            </dt>
            <dd>{projectEntity.projectTitle}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="myProjectListApp.project.description">Description</Translate>
              </span>
            </dt>
            <dd>{projectEntity.description}</dd>
            <dt>
              <span id="image">
                <Translate contentKey="myProjectListApp.project.image">Image</Translate>
              </span>
            </dt>
            <dd>
              {projectEntity.image ? (
                <div>
                  <a onClick={openFile(projectEntity.imageContentType, projectEntity.image)}>
                    <img src={`data:${projectEntity.imageContentType};base64,${projectEntity.image}`} style={{ maxHeight: '30px' }} />
                  </a>
                  <span>
                    {projectEntity.imageContentType}, {byteSize(projectEntity.image)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="publishedDate">
                <Translate contentKey="myProjectListApp.project.publishedDate">Published Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={projectEntity.publishedDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="projectLanguage">
                <Translate contentKey="myProjectListApp.project.projectLanguage">Project Language</Translate>
              </span>
            </dt>
            <dd>{projectEntity.projectLanguage}</dd>
            <dt>
              <span id="isPublished">
                <Translate contentKey="myProjectListApp.project.isPublished">Is Published</Translate>
              </span>
            </dt>
            <dd>{projectEntity.isPublished ? 'true' : 'false'}</dd>
            <dt>
              <Translate contentKey="myProjectListApp.project.title">Title</Translate>
            </dt>
            <dd>{projectEntity.title ? projectEntity.title.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/project" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/project/${projectEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ project }: IRootState) => ({
  projectEntity: project.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetail);
