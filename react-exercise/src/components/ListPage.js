import { Button } from "react-bootstrap";

function Listing(props) {
  return (
    <div className="listing">
      <h3>
        <a href={props.repoData.html_url} target="_blank">
          {props.repoData.name}
        </a>
      </h3>
      <p>
        {props.repoData.description
          ? props.repoData.description
          : props.repoData.full_name}
      </p>
      <Button variant="primary" size="sm" color="#428bca">
        {props.repoData.language
          ? props.repoData.language
          : props.repoData.open_issues + " Open Issues"}
      </Button>
      <Button variant="primary" size="sm" color="#428bca">
        {props.repoData.default_branch}
      </Button>
      <Button variant="primary" size="sm" color="#428bca">
        {props.repoData.visibility}
      </Button>
    </div>
  );
}

export default Listing;
