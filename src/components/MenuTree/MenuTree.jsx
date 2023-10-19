import React from 'react';
import './MenuTree.css';
import TreeView, { flattenTree } from 'react-accessible-treeview';
import treeIcon from '../../images/tree-menu-icon.svg';

const Icon = () => <img src={treeIcon} alt="" />;

const folder = {
	name: '',
	children: [
		{
			name: 'Figma',
			children: [{ name: 'index.js' }, { name: 'styles.css' }],
		},
		{
			name: 'Типографика',
			children: [
				{
					name: 'Типографика',
					children: [{ name: 'bundle.js' }],
				},
				{ name: 'react', children: [{ name: 'bundle.js' }] },
			],
		},
		{
			name: '.npmignore',
		},
		{
			name: 'package.json',
		},
		{
			name: 'webpack.config.js',
		},
	],
};

const data = flattenTree(folder);

export default function MenuTree() {
	return (
		<div className="tree-menu">
			<TreeView
				data={data}
				className="basic"
				aria-label="basic example tree"
				nodeRenderer={({ element, getNodeProps, level, handleSelect }) => (
					<div className="node">
						<Icon />
						<div {...getNodeProps()} style={{ paddingLeft: 20 * (level - 1) }}>
							{element.name}
						</div>
					</div>
				)}
			/>
		</div>
	);
}
