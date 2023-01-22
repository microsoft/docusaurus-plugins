import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

type FeatureItem = {
    title: string;
    Svg: React.ComponentType<React.ComponentProps<"svg">>;
    description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
    {
        title: "Built on Docusaurus",
        Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
        description: (
            <>
                Leverage the goodness of Docusaurus, designed from the ground up
                to be easily installed and used to get your website up and
                running quickly.
            </>
        ),
    },
    {
        title: "Battery included for CS",
        Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
        description: (
            <>Out of the box, accessibility, analytics, math, diagrams, ...</>
        ),
    },
    {
        title: "Build Code Snippets",
        Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
        description: (
            <>
                Automatically run your tool on every code snippet in your
                automated build.
            </>
        ),
    },
    {
        title: "Live Code Editing",
        Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
        description: (
            <>
                Seamlessly run your tool on client with a rich coding
                experience.
            </>
        ),
    },
    {
        title: "Deploy to GitHub Pages",
        Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
        description: (
            <>
                Designed for open source tools on GitHub, tested on GitHub
                Actions and hosted on Github Pages.
            </>
        ),
    },
    {
        title: "Customizable through MDX",
        Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
        description: (
            <>
                Add that last level of custom support through the flexibility of
                React and MDX.
            </>
        ),
    },
];

function Feature({ title, Svg, description }: FeatureItem) {
    return (
        <div className={clsx("col col--4")}>
            <div className="text--center">
                <Svg className={styles.featureSvg} role="img" />
            </div>
            <div className="text--center padding-horiz--md">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default function HomepageFeatures(): JSX.Element {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
