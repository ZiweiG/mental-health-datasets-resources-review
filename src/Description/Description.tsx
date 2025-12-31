import React from "react";

export default function Description() {
  return (
    <div>
        <h1 style={styles.title}>
            A Comprehensive Survey of Datasets and Resources for Computational Mental Health
        </h1>
    <div style={styles.container}>
        {/* <h1 style={styles.title}>
            A Comprehensive Survey of Datasets and Resources for Computational Mental Health
        </h1> */}

        <strong style={styles.subtitle}>
            A living resource tracking over 268 datasets across text,
            speech, and multimodal signals.
        </strong>

        <p style={styles.paragraph}>
        Access to high-quality data remains one of the central challenges in developing
        robust, clinically grounded AI for mental health. While the field has seen a
        surge in dataset creation over the last decade, these resources are often
        fragmented across different domains, modalities, and publication venues.
        </p>

        <p style={styles.paragraph}>
        This website serves as the interactive companion to our paper,
        <em> [Insert Paper Title]</em>. Unlike previous surveys that focus on specific
        tasks or single modalities, this resource offers a holistic view of
        268 datasets, <strong>categorized by:</strong>
        </p>

        <ul style={styles.list}>
        <li>
            <strong>Disorder Type:</strong> From depression and anxiety to bipolar disorder
            and beyond.
        </li>
        <li>
            <strong>Modality:</strong> Text, speech, and multimodal signal processing.
        </li>
        <li>
            <strong>Task Formulation:</strong> Screening, symptom monitoring, and diagnostic
            support.
        </li>
        <li>
            <strong>Additional Attributes:</strong> Population demographics, annotation
            schemes, data availability, and evaluation settings.
        </li>
        </ul>

        <p style={styles.paragraph}>
        Our goal is to facilitate reproducibility, cross-dataset benchmarking, and
        systematic comparison to guide the next generation of mental health AI
        applications.
        </p>

        <h2 style={styles.sectionTitle}>What you will find here</h2>
        <ul style={styles.list}>
        <li>
            <strong>Searchable Tables:</strong> Filter the full collection of 268 datasets by
            modality, task, and evaluation setting.
        </li>
        <li>
            <strong>Interactive Visualizations:</strong> Explore key trends in data
            construction and disorder representation over the last decade.
        </li>
        <li>
            <strong>Gap Analysis:</strong> Identify under-represented populations and
            disorders, with detailed discussion in our{" "}
            <a href="#" style={styles.link}>
            paper
            </a>
            .
        </li>
        </ul>

        <p style={styles.paragraph}>
        We aim to help researchers move beyond dataset discovery hurdles and focus on
        building safer, more effective therapeutic support models.
        </p>
    </div>
    </div>
  );
}

const styles: {
  container: React.CSSProperties;
  title: React.CSSProperties;
  subtitle: React.CSSProperties;
  sectionTitle: React.CSSProperties;
  paragraph: React.CSSProperties;
  list: React.CSSProperties;
  link: React.CSSProperties;
} = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "1rem",
    // fontFamily: "system-ui, -apple-system, sans-serif",
    lineHeight: 1.6,
    textAlign: 'left',
  },
  title: {
    fontSize: "2rem",
    fontWeight: 700,
    marginBottom: "1rem",
    textAlign: 'center',
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#555",
    marginBottom: "1.5rem",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    marginTop: "2rem",
    marginBottom: "1rem",
  },
  paragraph: {
    marginBottom: "1rem",
  },
  list: {
    paddingLeft: "1.5rem",
    marginBottom: "1.5rem",
  },
  link: {
    color: "#2563eb",
    textDecoration: "none",
  },
};
